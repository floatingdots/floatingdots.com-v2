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
      name: 'alt',
      type: 'localeString',
      title: 'Alternative text',
      description: 'Important for SEO and accessiblity.',
      options: {
        isHighlighted: true
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
      name: 'caption',
      type: 'localeString',
      title: 'Caption',
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
