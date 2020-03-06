export default {
  name: 'careersBody',
  type: 'object',
  title: 'Creers Body',
  fields: [
    {
      name: 'title',
      type: 'localeShortText',
      title: 'Title'
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
