import React from 'react'
import styled from 'styled-components'

// import clientConfig from '../../../../lib/client-config'

const Wrapper = styled.div`
  display: block;
  margin: 0 0 2.4rem 0;
`

const Link = styled.a`
  font-size: 1.6rem;
  margin: 0 0 2.4rem 0;
`

export default ({node}) => {
  if (node && node.file && node.file.asset) {
    // const [, _id, ext] = node.file.asset._ref.split('-')
    // const {projectId, dataset} = clientConfig.sanity
    // const fileURL = `https://cdn.sanity.io/files/${projectId}/${dataset}/${_id}.${ext}`
    const fileURL = node.file.asset.url
    const text = node.text

    return (
      <Wrapper>
        <Link href={fileURL}>
          {text}
        </Link>
      </Wrapper>
    )
  } else {
    return null
  }
}
