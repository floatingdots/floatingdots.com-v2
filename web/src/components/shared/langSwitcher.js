import React, {useContext} from 'react'
import {Link} from 'gatsby'
import styled from 'styled-components'
import {AlternateLinksContext} from '../layout/wrapWithI18nProvider'
import {useTranslation} from 'react-i18next'

import {colors} from '../../lib/variables'

const Wrapper = styled.div`
  display: block;
  text-align: ${props => props.footer ? 'left' : 'right'};
`

const Title = styled.span`
  font-size: 2rem;
  display: block;
  font-weight: 700;
  margin: 0 0 1.6rem 0;
  color: ${props => props.footer ? 'white' : colors.lightBlack};
`

const StyledLink = styled(props => <Link {...props} />)`
  display: block;
  font-size: 1.8rem;
  color: ${props => props.footer ? 'white' : colors.lightBlack};
  text-decoration: none;
  margin: 0 0 2.4rem 0;
  &.active{
    font-weight: 700;
  }
`

const LangSwitcher = props => {
  const {onHideNav, footer} = props

  const alternateLinks = useContext(AlternateLinksContext)
  const {t, i18n} = useTranslation(['common'])
  const _w = typeof window !== 'undefined' && window

  return (
    <Wrapper footer={footer}>
      <Title footer={footer}>Select Language</Title>
      {alternateLinks &&
      alternateLinks
        .map((link, i) => [
          <StyledLink
            footer={footer ? 1 : 0} // https://github.com/styled-components/styled-components/issues/1198
            key={link}
            to={link.path}
            hrefLang={link.language}
            className={link.language === i18n.language && 'active'}
            onClick={() => {
              _w && _w.localStorage.setItem('userSelectedLang', link.language)
              _w && _w.localStorage.setItem('langIsSelected', 'true')
              _w && link.language === _w.localStorage.getItem('userSelectedLang') && onHideNav()
            }}
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
