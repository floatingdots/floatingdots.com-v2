import React from 'react'
import styled from 'styled-components'
import {colors} from '../../lib/variables'
import PortableText from '../../components/shared/portableText'

const Wrapper = styled.div`
  max-width: 680px;
  margin: 0 auto 8rem auto;
`

const CareersBody = props => {
  const {body} = props
  return (
    <Wrapper>
      {body && body.locale &&
        <PortableText blocks={body.locale} />
      }
    </Wrapper>
  )
}

export default CareersBody
