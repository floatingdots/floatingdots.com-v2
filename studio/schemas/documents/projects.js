export default {
  name: 'projects',
  type: 'document',
  title: 'Projects',
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
      name: 'subTitle',
      type: 'localeText',
      title: 'Sub Title'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug(URL)',
      validation: Rule => Rule.required(),
      options: {
        source: 'title.en',
        maxLength: 96
      }
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: '公開日',
      validation: Rule => Rule.required(),
      description: 'This can be used to schedule post for publishing',
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
      title: 'Platforms',
      name: 'platforms',
      type: 'string'
    },
    {
      title: 'Deliverables',
      name: 'deliverables',
      type: 'string'
    },
    {
      title: 'Techs',
      name: 'techs',
      type: 'string'
    },
    {
      title: 'URL',
      name: 'url',
      type: 'url'
    },
    {
      name: 'excerpt',
      type: 'localeExcerptPortableText',
      title: 'Excerpt',
      description: 'This ends up on summary pages, on Google, when people share your post in social media.'
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
      title: 'title.ja',
      publishedAt: 'publishedAt',
      slug: 'slug',
      media: 'mainImage'
    },
    prepare ({title = 'No title', publishedAt, slug = {}, media}) {
      const path = `/projects//${slug.current}/`
      return {
        title,
        media,
        subtitle: publishedAt ? path : 'Missing publishing date'
      }
    }
  }
}
