import React from 'react'
import styled from 'styled-components'
import {Link} from 'gatsby'
import {useTranslation} from 'react-i18next'

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
`

const Title = styled.span`
`

const DateCats = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.2rem;
  margin-top: 0.8rem;
`

const DateTime = styled.time`
  display: block;
  color: ${colors.lightBlack};
  margin: 0 0.8rem 0 0;
`

const StyledImg = styled(props => <ImgLQIP {...props} />)`
  transition: transform 250ms ease-in-out;
  max-width: 100%;
  margin: 0 0 0 auto;
`

function Blog (props) {
  const {title, publishedAt, slug, mainImage} = props
  const {i18n} = useTranslation()

  return (
    <>
      {title && slug && publishedAt && mainImage &&
      <Wrapper>
        <StyledLink to={getBlogUrl(publishedAt, slug.current, i18n.language)}>
          <StyledImg
            id={mainImage.asset.id}
            fluid={mainImage.asset.fluid}
            alt={(mainImage.alt && mainImage.alt.locale) || ' '}
          />
        </StyledLink>
        <StyledLink to={getBlogUrl(publishedAt, slug.current, i18n.language)}>
          <Title>{title.locale}</Title>
        </StyledLink>
        <DateCats>
          {publishedAt && (
            <DateTime DateTime={publishedAt}>
              {getPublishdAt(publishedAt, i18n.language)}
            </DateTime>
          )}
        </DateCats>
      </Wrapper>
      }
    </>
  )
}

export default Blog
