import React from 'react'
import styled from 'styled-components'
import {colors} from '../../lib/variables'

const Wrapper = styled.header`
  text-align: center;
`

const Title = styled.h1`
  font-size: 4rem;
  color: ${colors.lightBlack};
  margin: 8rem 0;
  @media (min-width: 768px) {
    margin: 12.8rem 0;
  }
`

const ProjectsHeader = props => {
  const {title} = props
  return (
    <Wrapper>
      {title && title.locale &&
        <Title>{title.locale}</Title>
      }
    </Wrapper>
  )
}

export default ProjectsHeader
