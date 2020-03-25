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
  const {i18n} = useTranslation()

  return (
    <Wrapper>
      {body && body[i18n.language] &&
        <PortableText blocks={body[i18n.language]} />}
    </Wrapper>
  )
}

export default CareersBody
