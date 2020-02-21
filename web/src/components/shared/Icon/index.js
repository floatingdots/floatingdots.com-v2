import React from 'react'
import NavIcon from './navicon'
import Arrow from './arrow'

function Icon (props) {
  switch (props.symbol) {
    case 'navicon':
      return <NavIcon {...props} />
    case 'arrow':
      return <Arrow {...props} />
    default:
      return <span>Unknown icon: {props.symbol}</span>
  }
}

export default Icon
