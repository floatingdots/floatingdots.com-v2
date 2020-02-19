
module.exports = function createLocalePages (page, actions) {
  const {createPage, deletePage} = actions
  const {context, ...rest} = page
  const currentDateTime = new Date().toISOString()
  const extraLanguages = ['ja'] // English is currently the default so it isn't needed here.

  deletePage(page)
  createPage({
    ...rest,
    context: {
      ...context,
      // locale: process.env.LOCALE,
      language: 'en',
      currentDatetime: currentDateTime
    }
  })
  if (extraLanguages.length) {
    extraLanguages.forEach(code => {
      const {path, context, ...rest} = page
      createPage({
        ...rest,
        path: `/${code}${path}`,
        // every page for each language gets the language code as a prefix
        // to its path: "/es/blog/<some-slug>" for example
        context: {
          ...context,
          language: 'en',
          locale: code,
          currentDatetime: currentDateTime
        }
      })
    })
  }
}
