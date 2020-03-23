const {format, isFuture, parseISO} = require('date-fns')

const {allLanguages, buildI18nPages} = require('./helpers')

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
          settings{
            languages
          }
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
    let allLangsblogPosts = {}
    const postsPerPage = 8
    const postEdges = (result.data.blog || {}).edges || []

    allLanguages.map(lang => {
      allLangsblogPosts[lang] = {}
      const postLength = postEdges.filter(edge => edge.node.settings.languages[lang])
      const numPages = Math.ceil(postLength / postsPerPage)

      allLangsblogPosts[lang].postLength = postLength
      allLangsblogPosts[lang].numPages = numPages

      reporter.info(`Total Blog Posts ${lang}: ${postLength}, Toal archive pages ${lang}: ${numPages}`)
    })

    const archiveTopPages = buildI18nPages(
      null,
      (_, lang) => ({
        path: lang === 'en' ? '/blog/' : `/${lang}/blog/`,
        component: require.resolve(`../src/templates/blog-archive.js`),
        context: {
          limit: postsPerPage,
          skip: 0,
          numPages: allLangsblogPosts[lang].numPages,
          currentPage: 1,
          currentDatetime: currentDateTime
        }
      }),
      ['common', ...locales], // Must incled common to show language switcher
      createPage,
      reporter
    )

    const maxNumPagesLang = allLanguages.reduce(() => {
      return allLanguages.sort((a, b) => allLangsblogPosts[b].numPages - allLangsblogPosts[a].numPages)[0]
    })
    const maxNumPages = allLangsblogPosts[maxNumPagesLang].numPages

    const archivePages = Promise.all(Array.from({length: maxNumPages}).map(async (_, i) => {
      await buildI18nPages(
        null,
        (_, lang) => ({
          skip: i + 1 > allLangsblogPosts[lang].numPages,
          path: i === 0 ? lang === 'en' ? '/blog/archive' : `/${lang}/blog/archive` : lang === 'en' ? `/blog/archive/${i + 1}/` : `/${lang}/blog/archive/${i + 1}/`,
          component: require.resolve(`../src/templates/blog-archive.js`),
          context: {
            limit: postsPerPage,
            skip: i * postsPerPage,
            numPages: allLangsblogPosts[lang].numPages,
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
  const locales = []

  await graphql(`
  query blogPages ($currentDateTime: Date!) {
    blog: allSanityBlog (
      filter: { slug: { current: { ne: null } }, publishedAt: { lte: $currentDateTime } }
    ){
      edges {
        node {
          id
          publishedAt
          title{
            en
            ja
          }
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

    const i18nPages = Promise.all(filteredEdges.map(async p => {
      const {id, slug = {}, publishedAt, title} = p.node
      const dateSegment = format(parseISO(publishedAt), 'yyyy/MM')

      await buildI18nPages(
        null,
        (_, lang) => ({
          skip: !title[lang],
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
