import {ValidationLocaleRequired} from '../lib/helper'

export default {
  name: 'mainImage',
  type: 'image',
  title: 'Image',
  options: {
    hotspot: true
  },
  validation: Rule => Rule.custom(el => {
    const {asset} = el
    if (!asset || !asset._ref) {
      console.log('antusntusnts')
      return 'Image is Required.'
    }
    return true
  }),
  fields: [
    {
      name: 'caption',
      type: 'string',
      title: 'キャプション',
      options: {
        isHighlighted: true
      }
      },
      validation: Rule =>
        Rule.custom(el => {
          const result = ValidationLocaleRequired(el, 'Image Alt')
          if (result) {
            return result
          }
          return true
        })
    },
    {
      name: 'alt',
      type: 'string',
      title: 'Altタグテキスト',
      description: 'SEO・アクセシビリティ用',
      // validation: Rule => Rule.error('You have to fill out the alternative text.').required(),
      options: {
        isHighlighted: true
      }
    }
  ],
  preview: {
    select: {
      imageUrl: 'asset.url',
      title: 'caption'
    }
  }
}
