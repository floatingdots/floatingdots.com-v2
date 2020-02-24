const {format, isFuture, parseISO} = require('date-fns')
const buildI18nPages = require('./helpers')

exports.createBlogArchives = async function createBlogArchives (graphql, actions, reporter) {
  const currentDateTime = new Date().toISOString()
  const {createPage} = actions
  const locales = []
  reporter.info('--------------------Blog Archives----------------------')

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
