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
      name: 'homeIntro',
      type: 'localeText',
      title: 'Home Intro'
    },
    {
      name: 'description',
      type: 'localeText',
      title: 'Description',
      description: 'Describe your blog for search engines and social media.'
    },
    {
      name: 'socialImage',
      type: 'mainImage',
      title: 'SNS用画像',
      description: 'SNS共有などで利用するデフォルト画像'
    },
    {
      name: 'address',
      type: 'text',
      title: 'Address',
      rows: 3
    },
    {
      name: 'googleMaps',
      type: 'string',
      title: 'Google Maps'
    },
    {
      name: 'email',
      type: 'string',
      title: 'Email'
    }
  ]
}
