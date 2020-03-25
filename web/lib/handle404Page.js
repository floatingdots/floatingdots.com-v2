module.exports = function handle404Page (page, actions, reporter) {
  const {createPage, deletePage} = actions
  if (page.path.match(/^\/[a-z]{2}\/404\/$/)) {
    const oldPage = {...page}
    const langCode = page.path.split('/')[1]
    page.matchPath = `/${langCode}/*`
    deletePage(oldPage)
    createPage(page)
  }
}
