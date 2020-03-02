import React from 'react'
import styled from 'styled-components'

import Header from './header'
import Body from './body'
import PositionsList from './positions-list'
import Divider from '../shared/divider'

const Wrapper = styled.article`
  display: block;
  margin: 8rem 0 0 0;
  @media (min-width: 768px) {
    margin: 8rem 0 0 0;
  }
`

const Careers = props => {
  const {intro, mainImage, body1, body2, body3, body4, positionsNodes} = props
  return (
    <Wrapper>
      <Header intro={intro} mainImage={mainImage} />
      <Body bodies={[body1, body2, body3, body4]} />
      <Divider />
      <PositionsList nodes={positionsNodes} />
    </Wrapper>
  )
}
export default Careers
