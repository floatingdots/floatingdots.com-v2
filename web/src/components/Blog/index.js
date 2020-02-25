import React from 'react'
import styled from 'styled-components'

import Header from './header'
import Body from './body'
import Contact from '../shared/contact'
import Divider from '../shared/divider'

const Wrapper = styled.article`
  display: block;
  margin: 8rem 0 0 0;
`

const Projects = props => {
  const {body, title, mainImage, publishedAt, lang} = props
  return (
    <Wrapper>
      <Header title={title} mainImage={mainImage} publishedAt={publishedAt} lang={lang} />
      <Divider />
      <Body body={body} />
      <Divider />
      <Contact />
    </Wrapper>
  )
}
export default Projects
