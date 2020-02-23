import React from 'react'
import styled from 'styled-components'

import Header from './header'
import Info from './info'
import Body from './body'
import Contact from '../shared/contact'
import Divider from '../shared/divider'

const Wrapper = styled.article`
  display: block;
`

const Projects = props => {
  const {body, title, subTitle, mainImage, platforms, deliverables, techs, url} = props
  return (
    <Wrapper>
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
