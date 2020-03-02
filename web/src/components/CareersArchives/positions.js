import React from 'react'
import styled from 'styled-components'
import {Link} from 'gatsby'
import {useTranslation} from 'react-i18next'

import {getCareersUrl} from '../../lib/helpers'
import {colors} from '../../lib/variables'

const Wrapper = styled.div`
  display: block;
  margin: 0 0 4rem 0;
`

const StyledLink = styled(props => <Link {...props} />)`
  color: ${colors.blue};
  font-size: 1.8rem;
  margin-top: 0.8rem;
  display: block;
  line-height: 1.25;
`

const Title = styled.span`
`

function Preview (props) {
  const {title, slug} = props
  const {i18n} = useTranslation()

  return (
    <Wrapper>
      <StyledLink to={getCareersUrl(slug.current, i18n.language)}>
        <Title>{title.locale}</Title>
      </StyledLink>
    </Wrapper>
  )
}

export default Preview
