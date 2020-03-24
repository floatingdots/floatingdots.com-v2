import React from 'react'
import {Link} from 'gatsby'
import styled from 'styled-components'

import Icon from '../shared/Icon/'
import {useTranslation} from 'react-i18next'

import LangSwitchBanner from '../shared/langSwitchBanner'

const Wrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #fff;
`

const Inner = styled.div`
  height: 48px;
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 16px;
  height: auto;
  display: flex;
  justify-content: space-between;
  transition: all 0.2s;
  @media (min-width: 768px) {
    padding: 8px 32px;
  }
`

const Logo = styled.img`
  width: auto;
  margin: 0;
`

const StyledLink = styled(props => <Link {...props} />)`
  position: relative;
  display: flex;
  align-items: center;
`

const Header = ({onHideNav, onShowNav, showNav, onHideLangSwitchBanner}) => {
  const {i18n} = useTranslation()

  return (
    <Wrapper>
      <LangSwitchBanner onHideLangSwitchBanner={onHideLangSwitchBanner} />
      <Inner>
        <StyledLink to={i18n.language === 'en' ? `/` : `/${i18n.language}`} title='Floating Dots'>
          <Logo src='/logo/logo_header.min.svg' alt='Floating Dots' />
        </StyledLink>
        <Icon role='button' aria-haspopup='true' aria-controls='nav' aria-label='Open navigation' symbol='navicon' onClick={showNav ? onHideNav : onShowNav} className={showNav && 'close'} />
      </Inner>
    </Wrapper>
  )
}

export default Header
