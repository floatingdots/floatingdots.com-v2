import React from 'react'
import {Link} from 'gatsby'
import YouTube from './Youtube'
import Figure from './Figure'
import FileDownload from './FileDownload'

import {getBlogUrl, getProjectsUrl, getCareersUrl, getLocaleUrl} from '../../../lib/helpers'
import {useTranslation} from 'react-i18next'

const serializers = {
  marks: {
    internalLink: ({mark, children}) => {
      let href
      const {i18n} = useTranslation()
      const {slug = {}, _type, publishedAt} = mark.reference

      if (_type === 'blog') {
        href = getBlogUrl(publishedAt, slug.current, i18n.language)
      } else if (_type === 'projects') {
        href = getProjectsUrl(slug.current, i18n.language)
      } else if (_type === 'careers') {
        href = getCareersUrl(slug.current, i18n.language)
      } else {
        href = getLocaleUrl(slug.current, i18n.language)
      }
      return <Link to={href}>{children}</Link>
    },
    link: ({mark, children}) => {
      const {blank, href} = mark
      return blank
        ? <a href={href} target='_blank' rel='noopener noreferrer'>{children}</a>
        : <a href={href}>{children}</a>
    }
  },
  types: {
    bodyImage: Figure,
    youtube: YouTube,
    fileDownload: FileDownload
  }
}

export default serializers
