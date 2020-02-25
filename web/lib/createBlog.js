const {format, isFuture, parseISO} = require('date-fns')
const buildI18nPages = require('./helpers')

exports.createBlogArchives = async function createBlogArchives (graphql, actions, reporter) {
  reporter.info('--------------------Blog Archives----------------------')
  const currentDateTime = new Date().toISOString()
  const {createPage} = actions
  const locales = []

  await graphql(`
  query blogArchives ($currentDateTime: Date!) {
    blog: allSanityBlog (
      filter: { slug: { current: { ne: null } }, publishedAt: { lte: $currentDateTime } }
    ){
      edges{
        node {
          slug {
            current
          }
          id
        }
      }
    }
  }
  `, {currentDateTime: currentDateTime}).then(async result => {
    if (result.errors) {
      throw result.errors
    }
    const postsPerPage = 8
    const blogLength = result.data.blog.edges.length
    const numPages = Math.ceil(blogLength / postsPerPage)

    reporter.info(`Total Blog Posts: ${blogLength}, Toal archive pages: ${numPages}`)

    const archiveTopPages = buildI18nPages(
      null,
      (_, lang) => ({
        path: lang === 'en' ? '/blog/' : `/${lang}/blog/`,
        component: require.resolve(`../src/templates/blog-archive.js`),
        context: {
          limit: postsPerPage,
          skip: 0,
          numPages,
          currentPage: 1,
          currentDatetime: currentDateTime
        }
      }),
      ['common', ...locales], // Must incled common to show language switcher
      createPage,
      reporter
    ).then(() => {
      return 'test'
    })

    const archivePages = Promise.all(Array.from({length: numPages}).map(async (_, i) => {
      await buildI18nPages(
        null,
        (_, lang) => ({
          path: i === 0 ? lang === 'en' ? '/blog/archive' : `/${lang}/blog/archive` : lang === 'en' ? `/blog/archive/${i + 1}/` : `/${lang}/blog/archive/${i + 1}/`,
          component: require.resolve(`../src/templates/blog-archive.js`),
          context: {
            limit: postsPerPage,
            skip: i * postsPerPage,
            numPages,
            currentPage: i + 1,
            currentDatetime: currentDateTime
          }
        }),
        ['common', ...locales], // Must incled common to show language switcher
        createPage,
        reporter
      )
    }))
    await Promise.all([archiveTopPages, archivePages])
  })
}

exports.createBlogPages = async function createBlogPages (graphql, actions, reporter) {
  reporter.info('--------------------Blog Pages----------------------')
  const currentDateTime = new Date().toISOString()
  const {createPage} = actions

  await graphql(`
  query blogPages ($currentDateTime: Date!) {
    blog: allSanityBlog (
      filter: { slug: { current: { ne: null } }, publishedAt: { lte: $currentDateTime } }
    ){
      edges {
        node {
          id
          publishedAt
          slug {
            current
          }
        }
      }
    }
  }
  `, {currentDateTime: currentDateTime}).then(async result => {
    if (result.errors) {
      throw result.errors
    }
    const postEdges = (result.data.blog || {}).edges || []
    const filteredEdges = postEdges.filter(edge => !isFuture(parseISO(edge.node.publishedAt)))
    const locales = []

    const i18nPages = Promise.all(filteredEdges.map(async p => {
      const {id, slug = {}, publishedAt} = p.node
      const dateSegment = format(parseISO(publishedAt), 'yyyy/MM')

      await buildI18nPages(
        null,
        (_, lang) => ({
          path: lang === 'en' ? `/blog/${dateSegment}/${slug.current}` : `/${lang}/blog/${dateSegment}/${slug.current}`,
          component: require.resolve('../src/templates/blog.js'),
          context: {
            id: id,
            currentDatetime: currentDateTime
          }
        }),
        ['common', ...locales], // Must incled common to show language switcher
        createPage,
        reporter
      )
    }))
    await Promise.all([i18nPages])
  })
}
