export default {
  name: 'aboutPage',
  type: 'document',
  title: 'About Page',
  __experimental_actions: ['update', 'create', /* 'delete', */ 'publish'],
  initialValue: {
    publishedAt: (new Date()).toISOString()
  },

  fields: [
    {
      name: 'title',
      type: 'localeString',
      title: 'Title'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title.en',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published at',
      description: 'This can be used to schedule post for publishing',
      validation: Rule => Rule.required(),
      options: {
        timeFormat: 'HH:mm:ss'
      }
    },
    {
      name: 'mainImage',
      type: 'mainImage',
      title: 'Main Image'
    },
    {
      name: 'excerpt',
      type: 'localeExcerptPortableText',
      title: 'Excerpt',
      description:
      'This ends up on summary pages, on Google, when people share your post in social media.'
    },
    {
      Title: 'Body 1',
      name: 'body1',
      type: 'aboutBody'
    },
    {
      Title: 'Body 2',
      name: 'body2',
      type: 'aboutBody'
    },
    {
      Title: 'Body 3',
      name: 'body3',
      type: 'aboutBody'
    }
  ],
  orderings: [
    {
      name: 'publishingDateDesc',
      title: 'Publishing date newest',
      by: [
        {
          field: 'publishedAt',
          direction: 'desc'
        }
      ]
    },
    {
      name: 'publishingDateAsc',
      title: 'Publishing date oldest',
      by: [
        {
          field: 'publishedAt',
          direction: 'asc'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title.en',
      publishedAt: 'publishedAt',
      slug: 'slug',
      media: 'mainImage'
    },
    prepare ({title = 'No title', publishedAt, slug = {}, media}) {
      const path = `/${slug.current}/`
      return {
        title,
        media,
        subtitle: publishedAt ? path : 'Missing publishing date'
      }
    }
  }
}
