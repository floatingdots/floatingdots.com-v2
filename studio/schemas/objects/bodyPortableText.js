import React from 'react'
import {MdLink, MdTextFields, MdOpenInNew} from 'react-icons/lib/md'
const smallRender = props => (
  <span style={{fontSize: '0.9rem'}}>{props.children}</span>
)

export default {
  name: 'bodyPortableText',
  type: 'array',
  title: 'Post body',
  of: [
    {
      type: 'block',
      title: 'Block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'}
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Number', value: 'number'}
      ],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Small',
            value: 'small',
            blockEditor: {
              icon: MdTextFields,
              render: smallRender
            }
          },
          {title: 'Emphasis', value: 'em'}],
        annotations: [
          {
            name: 'internalLink',
            type: 'object',
            title: 'Internal link',
            blockEditor: {
              icon: MdLink
            },
            fields: [
              {
                name: 'reference',
                type: 'reference',
                title: 'Reference',
                to: [
                  {type: 'blog'},
                  {type: 'projects'},
                  {type: 'careers'},
                  {type: 'pages'},
                  {type: 'aboutPage'},
                  {type: 'careersPage'}
                ],
                validation: Rule => Rule.required()
              }
            ]
          },
          {
            name: 'link',
            type: 'object',
            title: 'External link',
            blockEditor: {
              icon: MdOpenInNew
            },
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL',
                validation: Rule => Rule.uri({
                  allowRelative: false,
                  scheme: ['https', 'http', 'mailto', 'tel']
                }).required()
              },
              {
                title: '_blank',
                name: 'blank',
                type: 'boolean'
              }
            ]
          }

        ]
      }
    },
    {
      type: 'bodyImage',
      options: {hotspot: true}
    },
    {
      type: 'fileDownload',
      title: 'File'
    },
    {
      type: 'youtube'
    }
  ]
}
