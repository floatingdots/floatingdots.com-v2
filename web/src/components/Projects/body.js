import React from 'react'
import styled from 'styled-components'
import PortableText from '../../components/shared/portableText'
import {useTranslation} from 'react-i18next'

const Wrapper = styled.div`
  max-width: 680px;
  margin: 0 auto 8rem auto;
`

const ProjectsHeader = props => {
  const {body} = props
  const {i18n} = useTranslation()

  return (
    <Wrapper>
      {body && body[i18n.language] &&
        <PortableText blocks={body[i18n.language]} />}
    </Wrapper>
  )
}

export default ProjectsHeader
