import {format} from 'date-fns'

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
      title: 'タイトル'
      // description: 'Titles should be catchy, descriptive, and not too long'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'スラッグ(URL)',
      description: '半角英数96文字以内',
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
      description: '公開日(未来の日付で予約投稿)',
      options: {
        timeFormat: 'HH:mm:ss'
      }
    },
    {
      name: 'mainImage',
      type: 'mainImage',
      title: 'メインイメージ',
      description: '一覧ページサムネイル、SNS共有用'
    },
    {
      name: 'excerpt',
      type: 'localeExcerptPortableText',
      title: '抜粋',
      description:
        'SNS共有やSEO用の文章'
    },
    // {
    //   name: 'categories',
    //   type: 'array',
    //   title: 'カテゴリー',
    //   of: [
    //     {
    //       type: 'reference',
    //       to: {
    //         type: 'category'
    //       }
    //     }
    //   ]
    // },
    {
      name: 'body',
      type: 'localeBodyPortableText',
      title: '本文'
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
      const path = `/projects/}/${slug.current}/`
      return {
        title,
        media,
        subtitle: publishedAt ? path : 'Missing publishing date'
      }
    }
  }
}
