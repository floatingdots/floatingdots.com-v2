import React from 'react'
import {MdLink, MdTextFields} from 'react-icons/lib/md'
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
      // Styles let you set what your user can mark up blocks with. These
      // corrensponds with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'}
      ],
      lists: [{title: 'Bullet', value: 'bullet'}, {title: 'Number', value: 'number'}],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
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
        // Annotations can be any object structure – e.g. a link or a footnote.
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
                ]
              },
              {
                name: 'link',
                type: 'object',
                title: 'External link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: Rule => Rule.uri({
                      allowRelative: false,
                      scheme: ['https', 'http', 'mailto', 'tel']
                    })
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
        ]
      }
    },
    {
      type: 'mainImage',
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
