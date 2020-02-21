import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Title = styled.h2`
  letter-spacing: 0.05rem;
  font-weight: 700;
  line-height: 1.2;
  font-size: 2.8rem;
  @media (min-width: 768px) {
    font-size: 3.8rem;
  }
`

const Small = styled.span`
  font-size: 2.4rem;
  @media (min-width: 768px) {
    font-size: 3.2rem;
  }
`

const WeLove = (props) => {
  return (
    <Wrapper>
      <Title ><Small>We Love</Small><br />Design, Tech, and Business.</Title>
    </Wrapper>
  )
}
export default WeLove
