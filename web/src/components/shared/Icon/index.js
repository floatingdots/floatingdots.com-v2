import React from 'react'
import NavIcon from './navicon'

function Icon (props) {
  switch (props.symbol) {
    case 'navicon':
      return <NavIcon />
    default:
      return <span>Unknown icon: {props.symbol}</span>
  }
}

export default Icon
