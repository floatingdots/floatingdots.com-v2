import langs from './langs'

export default {
  title: 'Locale Text',
  name: 'localeText',
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
    rows: 5
  }))
}
