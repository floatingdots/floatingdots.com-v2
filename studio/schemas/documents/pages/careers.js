export default {
  name: 'careersPage',
  type: 'document',
  title: 'Careers Page',
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
      name: 'intro',
      type: 'localeText',
      title: 'Intro'
    },
    {
      Title: 'Body 1',
      name: 'body1',
      type: 'careersBody'
    },
    {
      Title: 'Body 2',
      name: 'body2',
      type: 'careersBody'
    },
    {
      Title: 'Body 3',
      name: 'body3',
      type: 'careersBody'
    },
    {
      Title: 'Body 4',
      name: 'body4',
      type: 'careersBody'
    }

  ],
  orderings: [
    {
      name: 'publishingDateAsc',
      title: 'Publishing date new–>old',
      by: [
        {
          field: 'publishedAt',
          direction: 'asc'
        },
        {
          field: 'title',
          direction: 'asc'
        }
      ]
    },
    {
      name: 'publishingDateDesc',
      title: 'Publishing date old->new',
      by: [
        {
          field: 'publishedAt',
          direction: 'desc'
        },
        {
          field: 'title',
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
