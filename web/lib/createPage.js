const pages = [
  {slug: 'home', locales: ['common']},
  {slug: 'about', locales: ['common']}
]
const buildI18nPages = require('./helpers')

module.exports = async function createPagePages (graphql, actions, reporter) {
  reporter.info('--------------------Pages----------------------')
  const currentDateTime = new Date().toISOString()
  const {createPage} = actions

  const i18nPages = pages.map(p => buildI18nPages(
    null,
    (_, lang) => ({
      path: p.slug === 'home' ? lang === 'en' ? '/' : `/${lang}` : lang === 'en' ? `/${p.slug}` : `/${lang}/${p.slug}`,
      component: require.resolve(`../src/templates/pages/${p.slug}.js`),
      context: {
        currentDatetime: currentDateTime
      }
    }),
    p.locales,
    createPage,
    reporter
  ))

  await Promise.all(i18nPages)
}
