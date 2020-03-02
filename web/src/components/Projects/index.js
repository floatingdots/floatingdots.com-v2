import React from 'react'
import styled from 'styled-components'
import {useTranslation} from 'react-i18next'

import Header from './header'
import Info from './info'
import Body from './body'
import Contact from '../shared/contact'
import Divider from '../shared/divider'
import BackButton from '../shared/backButton'

const Wrapper = styled.article`
  display: block;
  margin: 4rem 0 0 0;
  @media (min-width: 768px) {
    margin: 8rem 0 0 0;
  }`

const Projects = props => {
  const {body, title, subTitle, mainImage, platforms, deliverables, techs, url} = props
  const {t} = useTranslation('common')

  return (
    <Wrapper>
      <BackButton label={t('Back to Project List')} to='/projects' />

      <Header title={title} subTitle={subTitle} mainImage={mainImage} />
      <Divider />
      <Info platforms={platforms} deliverables={deliverables} techs={techs} url={url} />
      <Divider />
      <Body body={body} />
      <Divider />
      <Contact />
    </Wrapper>
  )
}
export default Projects
