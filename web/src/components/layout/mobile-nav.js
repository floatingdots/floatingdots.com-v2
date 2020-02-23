import React from 'react'
import {Link} from 'gatsby'
import {useTranslation} from 'react-i18next'
import styled from 'styled-components'

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
  padding: 8rem 1.6rem 8rem 2rem;
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
  return (
    <Wrapper className={(showNav && 'active')}>
      <Inner>
        <List>
          <Item><StyledLink to={i18n.language === 'en' ? '/projects/' : `/${i18n.language}/projects/`}>Projects</StyledLink></Item>
          <Item><StyledLink to={i18n.language === 'en' ? '/blog/' : `/${i18n.language}/blog/`}>Blog</StyledLink></Item>
          <Item><StyledLink to={i18n.language === 'en' ? '/about/' : `/${i18n.language}/about/`}>About</StyledLink></Item>
          <Item><StyledLink to={i18n.language === 'en' ? '/careers/' : `/${i18n.language}/careers/`}>Careers</StyledLink></Item>
        </List>
        <LanguageSwitcher />
      </Inner>
    </Wrapper>
  )
}

export default MobileNav
