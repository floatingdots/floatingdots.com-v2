import React from 'react'
import styled from 'styled-components'

import Header from './header'
import Body from './body'

const Wrapper = styled.article`
  display: block;
`

const Projects = props => {
  const {body, title} = props
  return (
    <Wrapper>
      <Header title={title} />
      <Body body={body} />
    </Wrapper>
  )
}
export default Projects
