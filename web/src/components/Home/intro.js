import React from 'react'
import styled from 'styled-components'
import {buildImageObj, cn} from '../../lib/helpers'
import {imageUrlFor} from '../../lib/image-url'
import PortableText from '../shared/portableText'
import {colors, font, fontfamily} from '../../lib/variables'

import Rotation from '../Home/rotation'

const Heading = styled.span`
  display: block;
  margin: 4.8rem 0 0 0;
  letter-spacing: 0.05rem;
`
const Top = styled.span`
  display: block;
  line-height: 1;
  font-size: 2.6rem;
  font-weight: 700;
`
const Bottom = styled.span`
  display: block;
  line-height: 1;
  margin-top: 0.2rem;
  font-size: 3.6rem;
  font-weight: 700;
  display: flex;
  flex-direction: row;
`

const Your = styled.span`
  display: block;
  line-height: 1;
  margin-right: 0.8rem;
  display: inline-block;
`

const Title = styled.h1`
  /* +font-mobile-base; */
  line-height: 1.2;
  margin-bottom: 5.6rem;
  white-space: pre-line;
`

const Intro = props => {
  const {intro} = props
  return (
    <section>
      <Heading>
        <Top>Design grow</Top>
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
