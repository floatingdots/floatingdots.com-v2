const {isFuture, parseISO} = require('date-fns')
const {buildI18nPages} = require('./helpers')

exports.createCareersPages = async function (graphql, actions, reporter) {
  const currentDateTime = new Date().toISOString()
  const {createPage} = actions
  reporter.info('--------------------Careers Pages----------------------')
  await graphql(`
  query careers ($currentDateTime: Date!) {
    careers: allSanityCareers (
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
    const postEdges = (result.data.careers || {}).edges || []
    const filteredEdges = postEdges.filter(edge => !isFuture(parseISO(edge.node.publishedAt)))
    const locales = []

    const i18nPages = filteredEdges.map(p => buildI18nPages(
      null,
      (_, lang) => ({
        path: lang === 'en' ? `/careers/${p.node.slug.current}` : `/${lang}/careers/${p.node.slug.current}`,
        component: require.resolve('../src/templates/careers.js'),
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
