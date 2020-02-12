import langs from './langs'

export default {
  name: 'localeBodyPortableText',
  type: 'object',
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: {collapsible: false}
    }
  ],
  fields: langs.map(lang => ({
    title: lang.title,
    name: lang.id,
    type: 'bodyPortableText',
    fieldset: lang.isDefault ? null : 'translations'
  }))
}
