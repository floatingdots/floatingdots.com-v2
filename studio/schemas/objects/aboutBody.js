
export default {
  name: 'aboutBody',
  type: 'object',
  title: 'About Body',
  fields: [
    {
      name: 'title',
      type: 'localeShortText',
      title: 'Title'
    },
    {
      name: 'mainImage',
      type: 'mainImage',
      title: 'Main Image'
    },
    {
      name: 'body',
      type: 'localeBodyPortableText',
      title: 'Body'
    }
  ],
  preview: {
    select: {
      title: 'title.en',
      subTitle: 'title.ja',
      media: 'mainImage'
    },
    prepare ({title = 'No title', subTitle = 'No Title', media}) {
      return {
        title,
        media,
        subTitle
      }
    }
  }
}
