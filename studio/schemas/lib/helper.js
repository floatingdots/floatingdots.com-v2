const locales = ['en', 'ja']

export function ValidationLocaleRequired (el, context, name) {
  let message = ''
  locales.map(locale => {
    if (context.document.title && context.document.title[locale]) {
      if (!el || !el[locale]) {
        const l = locale.charAt(0).toUpperCase() + locale.slice(1)
        message += `${name}(${l}) is Required.\n`
      }
    }
  })
  return message
}
export function ValidationLocaleTitleRequired (el, context, name) {
  if (locales.every(locale => !el[locale])) {
    return 'Title is Required.'
  }
}
