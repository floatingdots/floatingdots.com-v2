export default {
  name: 'careers',
  type: 'document',
  title: 'Careers',
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
      name: 'body',
      type: 'localeBodyPortableText',
      title: 'Body'
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
