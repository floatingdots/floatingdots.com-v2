import langs from './langs'

export default {
  title: 'Locale Short Text',
  name: 'localeShortText',
  type: 'object',
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      type: 'object',
      options: {collapsible: false}
    }
  ],
  fields: langs.map((lang, rows) => ({
    title: lang.title,
    name: lang.id,
    type: 'text',
    rows: 3
  }))
}
