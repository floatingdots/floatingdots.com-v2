import React from 'react'
import {Link} from 'gatsby'
import styled from 'styled-components'
import {useTranslation} from 'react-i18next'
import {getLocaleUrl} from '../../lib/helpers'
import LanguageSwitcher from '../shared/langSwitcher'

import {colors} from '../../lib//variables'

const Wrapper = styled.footer`
  display: block;
  background: ${colors.black};
  color: #eee;
`

const Inner = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 8rem 16px 2rem 16px;
  @media (min-width: 768px) {
    padding: 12.8rem 32px 4rem 32px;
    margin-top: 8rem;
  }
`

const Nav = styled.nav`
  display: block;
`

const Groups = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }

`

const Group1 = styled.div`
  flex: 0 0 60%;
  margin: 0 0 4rem 0;
`
const Group2 = styled.div`
  flex: 0 0 40%;
  margin: 0 0 4rem 0;
  @media (min-width: 768px) {
    margin: 0;
  }
`

const List = styled.ul`
  display: block;
  font-size: ${props => !props.small ? '3.2rem' : '1.4rem'};
  margin-bottom:  ${props => !props.small ? '4.0rem' : 'none'};
  font-weight: 700;
`

const Item = styled.li`
  margin: 0 0 4.8rem 0;
  line-height: 1;
`

const StyledLink = styled(props => <Link {...props} />)`
  color: #eee;
  text-decoration: none;
`

const Email = styled.a`
  font-size: 2rem;
  font-weight: 700;
  color: #eee;
  display: inline-block;
  margin: 0 0 4rem 0;
`

const Address = styled.span`
  display: block;
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 8rem 0;
`

const Copyright = styled.span`
  opacity: 0.5;
  font-size: 1.2rem;
  padding-top: 2.4rem;
  display: block;
  letter-spacing: 0.02rem;
`

const Footer = ({onHideNav}) => {
  const {i18n} = useTranslation()
  const _w = typeof window !== 'undefined' && window

  return (
    <Wrapper>
      <Inner>
        <Groups>
          <Group1>
            <Nav>
              <List>
                <Item><StyledLink onClick={_w && _w.location.pathname.split('/').includes('projects') ? onHideNav : undefined} to={getLocaleUrl('projects', i18n.language)}>Projects</StyledLink></Item>
                {/* <Item><StyledLink onClick={_w && _w.location.pathname.split('/').includes('blog') ? onHideNav : undefined} to={getLocaleUrl('blog', i18n.language)}>Blog</StyledLink></Item> */}
                <Item><StyledLink onClick={_w && _w.location.pathname.split('/').includes('about') ? onHideNav : undefined} to={getLocaleUrl('about', i18n.language)}>About</StyledLink></Item>
                <Item><StyledLink onClick={_w && _w.location.pathname.split('/').includes('contact') ? onHideNav : undefined} to={getLocaleUrl('contact', i18n.language)}>Contact</StyledLink></Item>
                <Item><StyledLink onClick={_w && _w.location.pathname.split('/').includes('careers') ? onHideNav : undefined} to={getLocaleUrl('careers', i18n.language)}>Careers</StyledLink></Item>
              </List>
            </Nav>
          </Group1>
          <Group2>
            <Email href='mail:hi@floatingdots.com'>hi@floatingdots.com</Email>
            {/* <Address>530 Fifth Ave,<br />Floor9 #13,<br />New York, NY 10036</Address> */}
            <LanguageSwitcher onHideNav={onHideNav} footer />
          </Group2>
        </Groups>
        <Copyright>&copy; Floating Dots, LLC</Copyright>
      </Inner>
    </Wrapper>
  )
}
export default Footer
