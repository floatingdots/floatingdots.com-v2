const {format, isFuture, parseISO} = require('date-fns')
const buildI18nPages = require('./helpers')

module.exports = async function createProjects (graphql, actions, reporter) {
  const currentDateTime = new Date().toISOString()
  const {createPage} = actions
  reporter.info('--------------------Projects Pages----------------------')
  return graphql(`
  query projects ($currentDateTime: Date!) {
    news: allSanityProjects (
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
  `, {currentDateTime: currentDateTime}).then(async (result) => {
    if (result.errors) {
      throw result.errors
    }
    const postEdges = (result.data.news || {}).edges || []
    const filteredEdges = postEdges.filter(edge => !isFuture(parseISO(edge.node.publishedAt)))
    const locales = []

    const i18nPages = filteredEdges.map(p => buildI18nPages(
      null,
      (_, lang) => ({
        path: lang === 'en' ? `/projects/${p.node.slug.current}` : `/${lang}/projects/${p.node.slug.current}`,
        component: require.resolve('../src/templates/projects.js'),
        context: {
          id: p.node.id,
          currentDatetime: currentDateTime
        }
      }),
      ['common', ...locales], // Must incled common to show language switcher
      createPage,
      reporter
    ))

    await Promise.all(i18nPages)
  })
}
