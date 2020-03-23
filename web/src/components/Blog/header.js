import React from 'react'
import ImgLQIP from '../shared/imgLqip'
import styled from 'styled-components'
import {useTranslation} from 'react-i18next'

import {getPublishdAt} from '../../lib/helpers'
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

const StyledImg = styled(props => <ImgLQIP {...props} />)`
`

const DateTime = styled.time`
  display: block;
  font-size: 1.6rem;
  font-weight: 700;
  color: ${colors.gray};
  margin-top: 1.6rem;
`

const BlogHeader = props => {
  const {title, mainImage, publishedAt} = props
  const {i18n} = useTranslation()

  return (
    <Wrapper>
      {mainImage && mainImage.asset &&
        <StyledImg
          loading='eager'
          id={mainImage.asset.id}
          fluid={mainImage.asset.fluid}
          alt={(mainImage.alt && mainImage.alt.locale) || ' '}
        />
      }
      {title && title.locale &&
        <Title>{title.locale}</Title>
      }
      {publishedAt && (
        <DateTime dateTime={publishedAt}>
          {getPublishdAt(publishedAt, i18n.language)}
        </DateTime>
      )}
    </Wrapper>
  )
}

export default BlogHeader
