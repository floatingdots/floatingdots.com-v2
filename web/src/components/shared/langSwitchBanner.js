import React, {useContext} from 'react'
import {Link} from 'gatsby'
import styled from 'styled-components'
import {AlternateLinksContext} from '../layout/wrapWithI18nProvider'
import {useTranslation} from 'react-i18next'
import Icon from '../shared/Icon/'

import {colors} from '../../lib/variables'

const Wrapper = styled.div`
  display: block;
  background: ${colors.black};
  color: white;
`

const Inner = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 16px;
  @media (min-width: 768px) {
    justify-content: flex-end;
    padding: 4px 32px;
  }
`

const Text = styled.span`
  font-size: 1.6rem;
  letter-spacing: 0.05rem;
  display: block;
  color: white;
  margin: 0 0.8rem 0 0;
  opacity: 0.9;
`

const Languages = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 1.6rem 0 0;
`

const StyledLink = styled(props => <Link {...props} />)`
  display: block;
  font-size: 1.6rem;
  color: white;
  text-decoration: none;
  margin: 0 0 0 2.4rem;
`

const StyledIcon = styled(props => <Icon {...props} />)`
  &:before,
  &:after{
    background: white;
  }
`

const LangSwitchBanner = ({onHideNav, onHideLangSwitchBanner}) => {
  const alternateLinks = useContext(AlternateLinksContext)
  const {t, i18n} = useTranslation(['common'])
  const _w = typeof window !== 'undefined' && window

  return (
    <Wrapper>
      { _w && _w.localStorage.getItem('currentLangIsBrowserLang') === 'false' && _w.localStorage.getItem('langIsSelected') !== 'true' &&
      <Inner>
        <Text>{t('Select a Language')}</Text>
        <Languages>
          {alternateLinks &&
            alternateLinks
              .map((link, i) => [
                <StyledLink
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
        </Languages>
        <StyledIcon
          role='button' aria-controls='Language Selector' aria-label='Close Language Selector'
          symbol='navicon'
          className='close'
          onClick={() => {
            _w && _w.localStorage.setItem('langIsSelected', 'true')
            onHideLangSwitchBanner()
          }} />
      </Inner>
      }
    </Wrapper>
  )
}

LangSwitchBanner.propTypes = {}
LangSwitchBanner.defaultProps = {}

export default LangSwitchBanner
