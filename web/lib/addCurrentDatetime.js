module.exports = function addCurrentDatetime (page, actions, reporter) {
  const currentDateTime = new Date().toISOString()
  const {createPage, deletePage} = actions
  deletePage(page)
  createPage({
    ...page,
    context: {
      ...page.context,
      currentDatetime: currentDateTime
    }
  })
}
