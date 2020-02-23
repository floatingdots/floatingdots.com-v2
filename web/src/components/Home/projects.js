
import React from 'react'
import {Link} from 'gatsby'
import {useTranslation} from 'react-i18next'
import styled from 'styled-components'
import Img from 'gatsby-image'

import {getProjectsUrl} from '../../lib/helpers'
import Icon from '../shared/Icon/'
import {colors} from '../../lib/variables'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  &:hover .image{
    transform: scale(1.05);
  }
`

const StyledLink = styled(props => <Link {...props} />)`
  text-decoration: none;
  &:hover{
    opacity: 0.85;
  }
`

const Heading = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 0 2.4rem 0;
`

const Title = styled.span`
  font-size: 2.8rem;
  font-weight: 700;
  color: ${colors.black};
  text-decoration: none;
  margin: 0 1.6rem 0 0;
  @media (min-width: 768px) {
    font-size: 3.2rem;
  }
`

const StyledImg = styled(props => <Img {...props} />)`
  transition: transform 250ms ease-in-out;
  max-width: 72%;
  margin: 0 0 0 auto;
`

function Projects (props) {
  const {title, mainImage} = props
  const {i18n} = useTranslation()

  return (
    <Wrapper>
      <StyledLink to={getProjectsUrl(props.slug.current, i18n.language)}>
        <Heading>
          <Title>{title.locale}</Title>
          <Icon symbol='arrow' options='forward' />
        </Heading>
        <StyledImg
          className='image'
          backgroundColor='#fff'
          fluid={mainImage.asset.fluid}
        />
      </StyledLink>
    </Wrapper>
  )
}

export default Projects
