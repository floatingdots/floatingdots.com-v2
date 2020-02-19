import React from 'react'
import styled from 'styled-components'
import {colors} from '../../lib/variables'

const Line = styled.hr`
  height: .8rem;
  border: none;
  background-color: ${colors.lightBlack};
  border-radius: 2px;
  padding: 0;
  margin: 4.8rem 0;
  @media (min-width: 768px) {
    margin: 12.8rem 0;
  }

`

const Divider = props => {
  return (
    <Line />
  )
}
export default Divider
