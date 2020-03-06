import React from 'react'
import {Link} from 'gatsby'
import YouTube from './Youtube'
import Figure from './Figure'
import FileDownload from './FileDownload'

const serializers = {
  marks: {
    internalLink: ({mark, children}) => {
      const {slug = {}} = mark
      const href = `/${slug.current}`
      return <Link to={href}>{children}</Link>
    },
    link: ({mark, children}) => {
      const {blank, href} = mark
      return blank
        ? <a href={href} target='_blank' rel='noopener'>{children}</a>
        : <a href={href}>{children}</a>
    }

  },
  types: {
    // authorReference: ({node}) => <span>{node.author.name}</span>,
    bodyImage: Figure,
    youtube: YouTube,
    fileDownload: FileDownload
  }
}

export default serializers
