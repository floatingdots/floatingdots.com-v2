import React from 'react'
import styled from 'styled-components'

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

const About = props => {
  const {body1, body2, body3} = props
  return (
    <Wrapper>
      <Body bodies={[body1, body2, body3]} />
      <Divider />
      <Contact />
    </Wrapper>
  )
}
export default About
