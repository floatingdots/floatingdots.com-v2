export default {
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  __experimental_actions: ['update', 'create', /* 'delete', */ 'publish'],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'description',
      type: 'localeText',
      title: 'Description',
      description: 'Describe your blog for search engines and social media.'
    },
    {
      name: 'heroImage',
      type: 'mainImage',
      title: 'トップページメイン画像'
    },
    {
      name: 'socialImage',
      type: 'mainImage',
      title: 'SNS用画像',
      description: 'SNS共有などで利用するデフォルト画像'
    },
    {
      name: 'keywords',
      type: 'array',
      title: 'Keywords',
      description: 'Add keywords that describes your blog.',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    }
  ]
}
