import React from 'react'
import styled from 'styled-components'
import {colors} from '../../lib/variables'

import Rotation from '../Home/rotation'

const Heading = styled.span`
  display: block;
  margin: 6.4rem 0 0 0;
  letter-spacing: 0.05rem;
  color: ${colors.black};
  @media (min-width: 768px) {
    margin: 12.8rem 0 0 0;
  }
`
const Top = styled.span`
  display: block;
  line-height: 1;
  font-size: 2.6rem;
  font-weight: 700;
  @media (min-width: 768px) {
    font-size: 4rem;
  }
`
const Bottom = styled.span`
  display: block;
  line-height: 1;
  margin-top: 0.2rem;
  font-size: 3.6rem;
  font-weight: 700;
  display: flex;
  flex-direction: row;
  @media (min-width: 768px) {
    font-size: 8rem;
  }
`

const Your = styled.span`
  display: block;
  line-height: 1;
  margin-right: 0.8rem;
  display: inline-block;
`

const Title = styled.h1`
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1.2;
  margin: 0.8rem 0 5.6rem 0;
  white-space: pre-line;
  @media (min-width: 768px) {
    margin-top: 2.4rem;
    font-size: 2rem;
  }
`

const Intro = props => {
  const {intro} = props
  return (
    <section>
      <Heading>
        <Top>Our design to grow</Top>
        <Bottom>
          <Your> your </Your>
          <Rotation />
        </Bottom>
      </Heading>
      <Title>{intro}</Title>
    </section>
  )
}
export default Intro
