const wrapWithI18nProvider = require('./src/components/layout/wrapWithI18nProvider').wrapWithI18nProvider
exports.wrapPageElement = wrapWithI18nProvider

exports.onClientEntry = () => {
  let browserLang

  const locationLang = window.location.pathname.split('/')[1]
  const currentLang = locationLang.length === 2 ? locationLang.toLocaleLowerCase() : 'en'
  if (process.browser && typeof navigator !== 'undefined' && navigator.language) {
    browserLang = navigator.language.toLocaleLowerCase().substring(0, 2)
  }

  try {
    if ('localStorage' in window) {
      if (browserLang === currentLang) {
        window.localStorage.setItem('currentLangIsBrowserLang', 'true')
      } else {
        window.localStorage.setItem('currentLangIsBrowserLang', 'false')
      }
    }
  } catch (e) {
  }
}
