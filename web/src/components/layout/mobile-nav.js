import React from 'react'
import {Link} from 'gatsby'
import {useTranslation} from 'react-i18next'
import styled from 'styled-components'
import {getLocaleUrl} from '../../lib/helpers'

import {colors} from '../../lib/variables'
import LanguageSwitcher from '../shared/langSwitcher'

const Wrapper = styled.nav`
  display: block;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  overflow-y: auto;
  top: 0;
  left: 0;
  position: fixed;
  background: ${colors.white};
  z-index: 10;
  pointer-events: none;
  transition: all 0.2s linear;
  opacity: 0;
  padding: 8rem 1.6rem 20rem 2rem;
  &.active{
    opacity: 0.98;
    pointer-events: auto;
  }
`

const Inner = styled.div`
  max-width: 1024px;
  display: block;
  overflow-y: auto;
  margin: 0 auto;
  padding: 0 16px;
  @media (min-width: 768px) {
    padding: 0 32px;
  }

`

const List = styled.ul`
  display: block;
  font-size: 3.2rem;
  font-weight: 700;
  margin: 4rem 0 5.6rem 0;
  text-align: right;
`

const Item = styled.li`
  margin: 0 0 4rem 0;
`

const StyledLink = styled(props => <Link {...props} />)`
  color: ${colors.black};
  text-decoration: none;
`
const MobileNav = ({onHideNav, onShowNav, showNav}) => {
  const {i18n} = useTranslation()
  const _w = typeof window !== 'undefined' && window

  return (
    <Wrapper id='nav' className={(showNav && 'active')}>
      <Inner>
        <List>
          <Item><StyledLink onClick={_w && _w.location.pathname.split('/').includes('projects') ? onHideNav : undefined} to={getLocaleUrl('projects', i18n.language)}>Projects</StyledLink></Item>
          {/* <Item><StyledLink onClick={_w && _w.location.pathname.split('/').includes('blog') ? onHideNav : undefined} to={getLocaleUrl('blog', i18n.language)}>Blog</StyledLink></Item> */}
          <Item><StyledLink onClick={_w && _w.location.pathname.split('/').includes('about') ? onHideNav : undefined} to={getLocaleUrl('about', i18n.language)}>About</StyledLink></Item>
          <Item><StyledLink onClick={_w && _w.location.pathname.split('/').includes('contact') ? onHideNav : undefined} to={getLocaleUrl('contact', i18n.language)}>Contact</StyledLink></Item>
          <Item><StyledLink onClick={_w && _w.location.pathname.split('/').includes('careers') ? onHideNav : undefined} to={getLocaleUrl('careers', i18n.language)}>Careers</StyledLink></Item>
        </List>
        <LanguageSwitcher onHideNav={onHideNav} />
      </Inner>
    </Wrapper>
  )
}

export default MobileNav
