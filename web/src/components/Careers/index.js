import React from 'react'
import styled from 'styled-components'

import {useTranslation} from 'react-i18next'
import Header from './header'
import Body from './body'
import BackButton from '../shared/backButton'

const Wrapper = styled.article`
  display: block;
  margin: 4rem 0 0 0;
  @media (min-width: 768px) {
    margin: 8rem 0 0 0;
  }
 `

const Projects = props => {
  const {body, title} = props
  const {t} = useTranslation('common')

  return (
    <Wrapper>
      <BackButton label={t('Back to Careers')} to='/careers' />
      <Header title={title} />
      <Body body={_rawBody} />
    </Wrapper>
  )
}
export default Projects
