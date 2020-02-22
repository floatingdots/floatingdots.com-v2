import React from 'react'
import Img from 'gatsby-image'
import {getFluidGatsbyImage} from 'gatsby-source-sanity'
import clientConfig from '../../../../lib/client-config'

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
      <figcaption>{node.caption}</figcaption>
    </figure>
  )
}
