import React from 'react'
import styled from 'styled-components'
import {useTranslation} from 'react-i18next'

import Header from './header'
import Body from './body'
import Contact from '../shared/contact'
import Divider from '../shared/divider'
import BackButton from '../shared/backButton'

const Wrapper = styled.article`
  display: block;
  margin: 4rem 0 0 0;
  @media (min-width: 768px) {
    margin: 8rem 0 0 0;
  }
`

const Projects = props => {
  const {title, mainImage, publishedAt, _rawBody} = props
  const {t} = useTranslation('common')

  return (
    <Wrapper>
      <BackButton label={t('Back to Blog List')} to='/blog' />
      <Header title={title} mainImage={mainImage} publishedAt={publishedAt} />
      <Divider />
      <Body body={_rawBody} />
      <Divider />
      <Contact />
    </Wrapper>
  )
}
export default Projects
