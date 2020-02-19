import React from 'react'
import {Link} from 'gatsby'
import styled from 'styled-components'

import Icon from '../shared/Icon/'
import i18next from 'i18next'

import {useTranslation} from 'react-i18next'
import LangSwitcher from '../shared/langSwitcher'

const Wrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #fff;
`

const Inner = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 16px;
  height: auto;
  display: flex;
  justify-content: space-between;
  transition: all 0.2s;
`

const Logo = styled.img`
  width: auto;
  margin: 0 0 0;
`

const StyledLink = styled(props => <Link {...props} />)`
  position: relative;
  display: flex;
  align-items: center;
`

const Header = ({onHideNav, onShowNav, showNav, path}) => {
  const {i18n} = useTranslation()
  return (
    <Wrapper>
      <Inner>
        <StyledLink to={i18n.language !== 'en' ? `/${i18n.language}` : '/'} title='Floating Dots'>
          <Logo src='/logo/logo_header.min.svg' />
        </StyledLink>
        <Icon symbol='navicon' onClick={showNav ? onHideNav : onShowNav} className={showNav && 'close'} />
      </Inner>
    </Wrapper>
  )
}

export default Header
