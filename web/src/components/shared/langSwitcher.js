import React, {useContext} from 'react'
import {Link} from 'gatsby'
import styled from 'styled-components'
import {AlternateLinksContext} from '../layout/wrapWithI18nProvider'
import {useTranslation} from 'react-i18next'

import {colors} from '../../lib/variables'

const Wrapper = styled.div`
  display: block;
  text-align: right;
`

const Title = styled.span`
  font-size: 2rem;
  display: block;
  font-weight: 700;
  margin: 0 0 1.6rem 0;
  color: ${colors.lightBlack};
`

const StyledLink = styled(props => <Link {...props} />)`
  display: block;
  font-size: 1.8rem;
  color: ${colors.lightBlack};
  text-decoration: none;
  margin: 0 0 2.4rem 0;
  &.active{
    font-weight: 700;
  }
`

const LangSwitcher = ({onHideNav}) => {
  const alternateLinks = useContext(AlternateLinksContext)
  const {t, i18n} = useTranslation(['common'])
  const _w = typeof window !== 'undefined' && window

  return (
    <Wrapper>
      <Title>Seect Language</Title>
      {alternateLinks &&
      alternateLinks
        .map((link, i) => [
          <StyledLink
            key={link}
            to={link.path}
            hrefLang={link.language}
            className={link.language === i18n.language && 'active'}
            onClick={() => { _w.localStorage.setItem('lang', link.language); _w && _w.location.pathname.split('/').includes(link.language) && onHideNav() }}
          >
            {t(link.language)}
          </StyledLink>
        ])}
    </Wrapper>
  )
}

LangSwitcher.propTypes = {}
LangSwitcher.defaultProps = {}

export default LangSwitcher
