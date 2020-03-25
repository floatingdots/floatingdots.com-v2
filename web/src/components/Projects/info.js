import React from 'react'
import styled from 'styled-components'
import {colors} from '../../lib/variables'

const Wrapper = styled.aside`
  max-width: 540px;
  margin: 0 auto;
  color:{colors.black};
`
const Label = styled.span`
  display: block;
  font-size: 1.6rem;
  font-weight: 700;
`

const Text = styled.p`
  font-size: 1.6rem;
`

const Link = styled.a`
  font-size: 1.6rem;
  color: ${colors.black};
`

const ProjectsHeader = props => {
  const {platforms, techs, deliverables, url} = props
  return (
    <Wrapper>
      {platforms &&
        <>
          <Label>Platforms: </Label>
          <Text>{platforms}</Text>
        </>}
      {techs &&
        <>
          <Label>Techs: </Label>
          <Text>{techs}</Text>
        </>}
      {deliverables &&
        <>
          <Label>Deliverables: </Label>
          <Text>{deliverables}</Text>
        </>}
      {url &&
        <>
          <Label>URL: </Label>
          <Link href={url} target='_blank'>{url}</Link>
        </>}

    </Wrapper>
  )
}

export default ProjectsHeader
