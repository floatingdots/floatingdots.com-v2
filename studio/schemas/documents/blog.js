import {format} from 'date-fns'
import {ValidationLocaleRequired, ValidationLocaleTitleRequired} from '../lib/helper'

export default {
  name: 'blog',
  type: 'document',
  title: 'Blog',
  initialValue: {
    publishedAt: (new Date()).toISOString()
  },
  fields: [
    {
      name: 'title',
      type: 'localeString',
      title: 'Title',
      validation: Rule =>
        Rule.custom((el, context) => {
          const result = ValidationLocaleTitleRequired(el, context, 'Excerpt')
          if (result) {
            return result
          }
          return true
        })
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
      title: 'Published At',
      validation: Rule => Rule.required(),
      description: 'This can be used to schedule post for publishing',
      options: {
        timeFormat: 'HH:mm:ss'
      }
    },
    {
      name: 'mainImage',
      type: 'mainImage',
      title: 'Main Image',
      description: 'This ends up on summary pages, on Google, when people share your post in social media.'
    },
    {
      name: 'excerpt',
      type: 'localeExcerptPortableText',
      title: 'Excerpt',
      description: 'This ends up on summary pages, on Google, when people share your post in social media.',
      validation: Rule =>
        Rule.custom((el, context) => {
          const result = ValidationLocaleRequired(el, context, 'Excerpt')
          if (result) {
            return result
          }
          return true
        })
    },
    {
      name: 'body',
      type: 'localeBodyPortableText',
      title: 'Body',
      validation: Rule =>
        Rule.custom((el, context) => {
          const result = ValidationLocaleRequired(el, context, 'Body')
          if (result) {
            return result
          }
          return true
        })
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
      const dateSegment = format(publishedAt, 'YYYY/MM')
      const path = `/blog/${dateSegment}/${slug.current}/`
      return {
        title,
        media,
        subtitle: publishedAt ? path : 'Missing publishing date'
      }
    }
  }
}
