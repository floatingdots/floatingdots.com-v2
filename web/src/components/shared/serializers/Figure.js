import React from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'
import clientConfig from '../../../../lib/client-config'
import {getFluidGatsbyImage} from 'gatsby-source-sanity'

import {colors} from '../../../lib/variables'

const Caption = styled.figcaption`
  color: ${colors.lightBlack};
  font-size: 1.2rem;
  letter-spacing: 0.02rem;
  margin: 0.4rem 0 0 0;
`

export default ({node}) => {
  if (!node || !node.asset || !node.asset._ref) { return null }
  const fluidProps = getFluidGatsbyImage(
    node.asset._ref,
    {maxWidth: 675},
    clientConfig.sanity
  )
  return (
    <figure>
      <Img fluid={fluidProps} alt={node.alt} />
      <Caption>{node.caption}</Caption>
    </figure>
  )
}
