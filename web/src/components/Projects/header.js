import React from 'react'
import ImgLQIP from '../shared/imgLqip'
import styled from 'styled-components'
import {colors} from '../../lib/variables'

const Wrapper = styled.header`
  text-align: center;
`

const Title = styled.h1`
  font-size: 4rem;
  color: ${colors.lightBlack};
  margin-top: 4rem;
`

const SubTitle = styled.h2`
  font-size: 1.8rem;
  color: ${colors.lightBlack}ee;
  white-space: pre-line;
`

const StyledImg = styled(props => <ImgLQIP {...props} />)`
`

const ProjectsHeader = props => {
  const {title, subTitle, mainImage} = props
  return (
    <Wrapper>
      {mainImage && mainImage.asset &&
        <StyledImg
          loading='eager'
          fluid={mainImage.asset.fluid}
        />
      }
      {title && title.locale &&
        <Title>{title.locale}</Title>
      }
      {subTitle && subTitle.locale &&
        <SubTitle>{subTitle.locale}</SubTitle>
      }
    </Wrapper>
  )
}

export default ProjectsHeader
