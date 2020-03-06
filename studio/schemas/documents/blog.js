import {format} from 'date-fns'
import {ValidationLocaleRequired} from '../lib/helper'

export default {
  name: 'blog',
  type: 'document',
  title: 'Blog',
  initialValue: {
    publishedAt: (new Date()).toISOString(),
    body: {
      _type: 'object',
      link: {
        _type: 'object',
        blank: true
      }
    }
  },
  fields: [
    {
      name: 'title',
      type: 'localeString',
      title: 'Title',
      validation: Rule =>
        Rule.custom((el, context) => {
          console.log(context)
          const result = ValidationLocaleRequired(el, 'Title')
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
        Rule.custom(el => {
          const result = ValidationLocaleRequired(el, 'Excerpt')
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
        Rule.custom(el => {
          const result = ValidationLocaleRequired(el, 'Body')
          if (result) {
            return result
          }
          return true
        })
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
