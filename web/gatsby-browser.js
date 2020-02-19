const langs = ['ja'] // Exclude primary lang

const wrapWithI18nProvider = require('./src/components/layout/wrapWithI18nProvider').wrapWithI18nProvider
exports.wrapPageElement = wrapWithI18nProvider

exports.onClientEntry = () => {
  let browserLang
  let lsLang

  const locationLang = window.location.pathname.split('/')[1]
  const currentLang = locationLang.length === 2 ? locationLang.toLocaleLowerCase() : 'en'
  if (process.browser && typeof navigator !== 'undefined' && navigator.language) {
    browserLang = navigator.language.toLocaleLowerCase().substring(0, 2)
  }

  try {
    if ('localStorage' in window) {
      lsLang = window.localStorage.getItem('lang')
      const langSet = window.localStorage.getItem('langSet')

      if (lsLang) {
        return
      }

      if (langSet !== 'true' && browserLang === currentLang) {
        if (langs.includes(browserLang)) {
          window.localStorage.setItem('currentLangIsBrowserLang', 'true')
        } else {
          window.localStorage.setItem('currentLangIsBrowserLang', 'false')
        }
      }
    }
  } catch (e) {
  }
}
