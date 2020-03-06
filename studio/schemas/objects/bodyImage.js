export default {
  name: 'bodyImage',
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
      type: 'string',
      title: 'Alternative text',
      description: 'Important for SEO and accessiblity.',
      options: {
        isHighlighted: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'caption',
      type: 'string',
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
