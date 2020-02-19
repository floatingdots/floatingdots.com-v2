import React from 'react'
import YouTube from './Youtube'
import Figure from './Figure'

const serializers = {
  types: {
    authorReference: ({node}) => <span>{node.author.name}</span>,
    mainImage: Figure,
    youtube: YouTube

  }
}

export default serializers
