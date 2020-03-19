import Settings from '../../components/Settings'

export default {
  type: 'object',
  inputComponent: Settings,
  name: 'settings',
  title: 'Settings',
  fields: [
    {
      name: 'languages',
      type: 'array',
      title: 'Languages',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: '🇺🇸English', value: 'en'},
          {title: '🇯🇵Japanese', value: 'ja'}
        ]
      },
      validation: Rule => Rule.required().error('Language is Required.')

    }
  ]
}
