import React from 'react'
import {format, formatDistanceToNow, differenceInDays, parseISO} from 'date-fns'
import {ja} from 'date-fns/locale'

import Img from 'gatsby-image'
import styled from 'styled-components'
import {colors} from '../../lib/variables'

const Wrapper = styled.header`
  text-align: center;
`

const Title = styled.h1`
  font-size: 4rem;
  line-height: 1.25;
  color: ${colors.lightBlack};
  margin: 4rem auto 0 auto;
  max-width: 640px;

`

const StyledImg = styled(props => <Img {...props} />)`
`

const DateTime = styled.time`
  display: block;
  font-size: 1.6rem;
  font-weight: 700;
  color: ${colors.gray};
  margin-top: 1.6rem;
`

const BlogHeader = props => {
  const {title, mainImage, publishedAt, lang} = props
  return (
    <Wrapper>
      {mainImage && mainImage.asset &&
        <StyledImg
          className='image'
          loading='eager'
          fluid={mainImage.asset.fluid}
        />
      }
      {title && title.locale &&
        <Title>{title.locale}</Title>
      }
      {publishedAt && (
        <DateTime dateTime={publishedAt}>
          {lang === 'en' && `Posted At: ${(
            differenceInDays(parseISO(publishedAt), new Date()) > -1
              ? `${formatDistanceToNow(parseISO(publishedAt), {addSuffix: true})}`
              : format(parseISO(publishedAt), 'MMM dd, yyyy'))}` }
          {lang === 'ja' && `投稿日: ${(
            differenceInDays(parseISO(publishedAt), new Date()) > -1
              ? `${formatDistanceToNow(parseISO(publishedAt), {addSuffix: true, locale: ja})}`
              : format(parseISO(publishedAt), 'yyyy年MM月dd日(iii)', {locale: ja}))}` }
        </DateTime>
      )}
    </Wrapper>
  )
}

export default BlogHeader
