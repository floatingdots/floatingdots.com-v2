import React from 'react'
import {Link} from 'gatsby'
import {useTranslation} from 'react-i18next'
import styled from 'styled-components'

import {getBlogUrl, getPublishdAt} from '../../lib/helpers'
import {colors} from '../../lib/variables'
import ImgLQIP from '../shared/imgLqip'

const Wrapper = styled.div`
  display: block;
  margin: 0 0 4rem 0;
`

const StyledLink = styled(props => <Link {...props} />)`
  color: ${colors.black};
  text-decoration: none;
  font-size: 2.4rem;
  font-weight: 700;
  margin-top: 0.8rem;
  display: block;
  line-height: 1.25;
`

const Title = styled.span`
`

const DateTime = styled.time`
  display: block;
  color: ${colors.lightBlack};
  margin: 0 0.8rem 0 0;
`

const StyledImg = styled(props => <ImgLQIP {...props} />)`
  max-width: 100%;
  margin: 0 0 0 auto;
`

function Preview (props) {
  const {title, publishedAt, slug, mainImage} = props
  const {i18n} = useTranslation()

  return (
    <>
      {title && publishedAt && slug && mainImage &&
      <Wrapper>
        <StyledLink to={getBlogUrl(publishedAt, slug.current, i18n.language)}>
          <StyledImg
            id={mainImage.asset.id}
            fluid={mainImage.asset.localFile.childImageSharp.fluid}
            alt={(mainImage.alt && mainImage.alt.locale) || ' '}
          />
        </StyledLink>
        <StyledLink to={getBlogUrl(publishedAt, slug.current, i18n.language)}>
          <Title>{title.locale}</Title>
        </StyledLink>
        <DateTime>
          {getPublishdAt(publishedAt, i18n.language)}
        </DateTime>
      </Wrapper>
      }
    </>
  )
}

export default Preview
