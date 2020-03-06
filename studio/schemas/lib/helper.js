export function ValidationLocaleRequired (el, name) {
  if (!el['en'] || el['en'] === undefined) {
    return `${name} - En is Required.`
  }
  if (!el['ja'] || el['ja'] === undefined) {
    return `${name} - Ja is Required.`
  }
}
