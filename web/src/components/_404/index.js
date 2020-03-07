import React from 'react'
import {Link} from 'gatsby'
import styled from 'styled-components'
import {useTranslation} from 'react-i18next'

const Wrapper = styled.article`
  display: block;
  margin: 4rem 0 0 0;
  @media (min-width: 768px) {
    margin: 8rem 0 0 0;
  }
`

const Emoji = styled.span`
  font-size: 3rem;
  display: block;
  font-weight: 700;
`

const NotFound = styled.span`
  display: block;
  font-size: 1.8rem;
  margin: 0 0 4rem 0;
`

const StyledLink = styled(props => <Link {...props} />)`
  font-size: 2rem;
`

const _404 = props => {
  const {t, i18n} = useTranslation('common')

  return (
    <Wrapper>
      <Emoji>OOPS! 😱😱😱</Emoji>
      <NotFound>{t('Not Found')}</NotFound>
      <StyledLink to={i18n.language === 'ja' ? '/ja/' : '/'}>{t('goToTop')}</StyledLink>
    </Wrapper>
  )
}
export default _404
