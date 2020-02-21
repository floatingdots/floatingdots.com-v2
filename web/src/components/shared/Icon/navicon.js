import React from 'react'
import styled from 'styled-components'
import {colors} from '../../../lib/variables'

const Icon = styled.button`
  width: 48px;
  height: 48px;
  position: relative;
  cursor: pointer;
  background: none;
  border: none;
  &:before {
    transform: rotate(0deg);
    top: 19px;
    left: 12px;
    content: '';
    width: 24px;
    height: 1px;
    position: absolute;
    background: ${colors.black};
    transition: all 0.25s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    border-radius: 4px;
    }
  &.close:before {
    transform: rotate(135deg);
    top: 24px;
  }
  &:after{
    transform: rotate(0deg);
    bottom: 19px;
    left: 12px;
    content: '';
    width: 24px;
    height: 1px;
    position: absolute;
    background: ${colors.black};
    transition: all 0.25s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    border-radius: 4px;
  }
  &.close:after{
    transform: rotate(45deg);
    bottom: 23px;
  }
`

const NavIcon = (props) => {
  return (
    <Icon {...props} />
  )
}

export default NavIcon
