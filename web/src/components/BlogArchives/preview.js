import React from 'react'
import styled from 'styled-components'
import {Link} from 'gatsby'
import {useTranslation} from 'react-i18next'

import {format, formatDistanceToNow, differenceInDays, parseISO} from 'date-fns'
import ja from 'date-fns/locale/ja'

import {getBlogUrl} from '../../lib/helpers'
import {colors} from '../../lib/variables'
import Img from 'gatsby-image'

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

const DateTime = styled.span`
  display: block;
  color: ${colors.lightBlack};
  margin: 0 0.8rem 0 0;
`

const StyledImg = styled(props => <Img {...props} />)`
  transition: transform 250ms ease-in-out;
  max-width: 100%;
  margin: 0 0 0 auto;
`

function Preview (props) {
  const {title, publishedAt, slug, mainImage} = props
  const {i18n} = useTranslation()

  return (
    <Wrapper>
      <StyledLink to={getBlogUrl(publishedAt, slug.current, i18n.language)}>
        <StyledImg
          className='image'
          backgroundColor='#fff'
          fluid={mainImage.asset.fluid}
        />
      </StyledLink>
      <StyledLink to={getBlogUrl(publishedAt, slug.current, i18n.language)}>
        <Title>{title.locale}</Title>
      </StyledLink>
      <DateCats>
        {publishedAt && (
          <DateTime>
            {differenceInDays(parseISO(publishedAt), new Date()) > -1
              ? `${formatDistanceToNow(parseISO(publishedAt), {addSuffix: true, locale: ja})}`
              : format(parseISO(publishedAt), 'yyyy年MM月dd日(iii)', {locale: ja})}
          </DateTime>
        )}
      </DateCats>
    </Wrapper>
  )
}

export default Preview
