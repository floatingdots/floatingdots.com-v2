
import S from '@sanity/desk-tool/structure-builder'
import EyeIcon from 'part:@sanity/base/eye-icon'
import EditIcon from 'part:@sanity/base/edit-icon'
import MdSettings from 'react-icons/lib/md/settings'
import MdNote from 'react-icons/lib/md/note'
import MdNew from 'react-icons/lib/md/fiber-new'
import MdDesktopMac from 'react-icons/lib/md/desktop-mac'
import MdLocalOffer from 'react-icons/lib/md/local-offer'
import IframePreview from './components/previews/iframe/IframePreview'

import React from 'react'

const url = 'https://*****************.gtsb.io/'
const WebPreview = ({document}) => {
  const {displayed} = document
  return (
    (displayed.slug && displayed.slug.current &&
    <iframe
      style={{width: 100 + '%', height: 100 + '%'}}
      src={url + 'news/2045/01/' + displayed.slug.current}
      frameBorder={0}
    />) || <span>Please input slug</span>
  )
}

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Blog')
        .icon(MdNew)
        .schemaType('blog')
        .child(
          S.documentTypeList('blog')
            .title('Blog')
            .child(documentId =>
              S.document()
                .documentId(documentId)
                .schemaType('blog')
                .views([
                  S.view.form().icon(EditIcon),
                  S.view
                    .component(WebPreview)
                    .icon(EyeIcon)
                    .title('Web Preview')
                ])
            )
        ),
      S.listItem()
        .title('Projects')
        .icon(MdDesktopMac)
        .schemaType('projects')
        .child(
          S.documentTypeList('projects')
            .title('Projects')
            .child(documentId =>
              S.document()
                .documentId(documentId)
                .schemaType('projects')
                .views([
                  S.view.form().icon(EditIcon),
                  S.view
                    .component(WebPreview)
                    .icon(EyeIcon)
                    .title('Web Preview')
                ])
            )
        ),
      S.listItem()
        .title('Pages')
        .icon(MdNote)
        .schemaType('pages')
        .child(S.documentTypeList('pages').title('Pages')),
      S.divider(),
      S.listItem()
        .title('Categories')
        .icon(MdLocalOffer)
        .schemaType('category')
        .child(S.documentTypeList('category').title('Categories')),
      S.divider(),
      S.listItem()
        .title('Image Assets')
        .child(S.documentTypeList('sanity.imageAsset')
          .filter('extension == "jpg" || extension == "jpeg" || extension == "gif" || extension == "png" ')
          .defaultOrdering([{field: '_createdAt', direction: 'desc'}])),
      S.listItem()
        .title('File Assets')
        .child(S.documentTypeList('sanity.fileAsset')
          .filter('extension == "pdf" ')
          .defaultOrdering([{field: '_createdAt', direction: 'desc'}])),
      S.listItem()
        .title('Settings')
        .icon(MdSettings)
        .child(
          S.editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings')
        )
      // ...S.documentTypeListItems().filter(hiddenDocTypes)
    ])
