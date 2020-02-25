import React from 'react'
import styled from 'styled-components'

import Header from './header'
import Body from './body'
import Contact from '../shared/contact'
import Divider from '../shared/divider'

const Wrapper = styled.article`
  display: block;
  margin: 4rem 0 0 0;
  @media (min-width: 768px) {
    margin: 8rem 0 0 0;
  }
`

const Projects = props => {
  const {body, title, mainImage, publishedAt} = props
  return (
    <Wrapper>
      <Header title={title} mainImage={mainImage} publishedAt={publishedAt} />
      <Divider />
      <Body body={body} />
      <Divider />
      <Contact />
    </Wrapper>
  )
}
export default Projects
