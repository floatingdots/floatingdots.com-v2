import React from 'react'
import S from '@sanity/desk-tool/structure-builder'
import EyeIcon from 'part:@sanity/base/eye-icon'
import EditIcon from 'part:@sanity/base/edit-icon'
import {MdSettings, MdNote, MdCreate, MdDesktopMac, MdLocalOffer, MdPeople} from 'react-icons/lib/md'
import IframePreview from './components/Previews/iframe/IframePreview'

// https://www.sanity.io/docs/studio-environment-variables
const remoteURL = process.env.SANITY_STUDIO_GATSBY_PREVIEW_URL
const localURL = 'http://localhost:8000'
const previewURL = window.location.hostname === 'localhost' ? localURL : remoteURL

export const getDefaultDocumentNode = props => {
  const {schemaType} = props
  if (['blog', 'projects', 'careers', 'pages'].includes(schemaType)) {
    return S.document().views([
      S.view.form().icon(EditIcon),
      S.view
        .component(IframePreview)
        .icon(EyeIcon)
        .title('Web preview - En')
        .options({previewURL}),
      S.view
        .component(IframePreview)
        .icon(EyeIcon)
        .title('Web preview - Ja')
        .options({previewURL, locale: 'ja'})
    ])
  }
  return S.document().views([S.view.form()])
}

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Blog')
        .icon(MdCreate)
        .schemaType('blog')
        .child(S.documentTypeList('blog').title('Blog')),
      S.listItem()
        .title('Projects')
        .icon(MdDesktopMac)
        .child(S.documentTypeList('projects').title('Projects')),
      S.listItem()
        .title('Careers')
        .icon(MdPeople)
        .schemaType('careers')
        .child(S.documentTypeList('careers').title('Careers')),
      S.listItem()
        .title('Pages')
        .icon(MdNote)
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .title('About')
                .icon(MdNote)
                .child(
                  S.editor()
                    .title('About')
                    .schemaType('aboutPage')
                    .documentId('about')
                    .views([
                      S.view.form().icon(EditIcon),
                      S.view
                        .component(IframePreview)
                        .icon(EyeIcon)
                        .title('Web Preview')
                        .options({previewURL}),
                      S.view
                        .component(IframePreview)
                        .icon(EyeIcon)
                        .title('Web preview - Ja')
                        .options({previewURL, locale: 'ja'})
                    ])
                ),
              S.listItem()
                .title('Careers')
                .icon(MdNote)
                .child(
                  S.editor()
                    .title('Careers')
                    .schemaType('careersPage')
                    .documentId('careers')
                    .views([
                      S.view.form().icon(EditIcon),
                      S.view
                        .component(IframePreview)
                        .icon(EyeIcon)
                        .title('Web Preview')
                        .options({previewURL}),
                      S.view
                        .component(IframePreview)
                        .icon(EyeIcon)
                        .title('Web preview - Ja')
                        .options({previewURL, locale: 'ja'})
                    ])
                ),
              S.listItem()
                .title('Contact')
                .icon(MdNote)
                .child(
                  S.editor()
                    .title('Contact')
                    .schemaType('pages')
                    .documentId('contact')
                    .views([
                      S.view.form().icon(EditIcon),
                      S.view
                        .component(IframePreview)
                        .icon(EyeIcon)
                        .title('Web Preview')
                        .options({previewURL}),
                      S.view
                        .component(IframePreview)
                        .icon(EyeIcon)
                        .title('Web preview - Ja')
                        .options({previewURL, locale: 'ja'})
                    ])
                ),
              S.divider(),
              S.listItem()
                .title('All pages with schemas pages')
                .child(S.documentTypeList('pages')
                )
            ])
        ),
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
