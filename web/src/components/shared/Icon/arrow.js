import React from 'react'
import styled from 'styled-components'
import {colors} from '../../../lib/variables'

const Wrapper = styled.div`
  display: inline-block;
  transform: ${props => props.options === 'forward' ? 'scaleX(-1)' : ''};
`

const Arrow = styled.div`
  display: block;
  position: relative;
  background-color: ${colors.blue};
  width: 4rem;
  height: 0.2rem;
  border-radius: 1rem;
  &:before {
    transform: rotate(-40deg);
  }
  &:after {
    transform: rotate(40deg);
  }
  &:before, &:after {
    background-color: ${colors.blue};
    display: block;
    content: "";
    position: absolute;
    left: 0;
    width: 2rem;
    height: 0.2rem;
    transform-origin: 0.08rem center;
  }
`

const Icon = (props) => {
  const {options} = props
  return (
    <Wrapper options={options} >
      <Arrow />
    </Wrapper>
  )
}

export default Icon
