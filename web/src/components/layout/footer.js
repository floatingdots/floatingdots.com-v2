import React from 'react'
import {Link} from 'gatsby'
import styled from 'styled-components'
import {useTranslation} from 'react-i18next'

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
    padding: 8rem 32px 4rem 32px;
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
  @media (min-width: 768px) {
    margin: 0;
  }
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
`

const Copyright = styled.span`
  opacity: 0.5;
  font-size: 1.2rem;
  padding-top: 2.4rem;
  display: block;
  letter-spacing: 0.02rem;
`

const Footer = () => {
  const {i18n} = useTranslation()

  return (
    <Wrapper>
      <Inner>
        <Groups>
          <Group1>
            <Nav>
              <List>
                <Item><StyledLink to={i18n.language === 'en' ? '/projects/' : `/${i18n.language}/projects/`}>Projects</StyledLink></Item>
                <Item><StyledLink to={i18n.language === 'en' ? '/blog/' : `/${i18n.language}/blog/`}>Blog</StyledLink></Item>
                <Item><StyledLink to={i18n.language === 'en' ? '/about/' : `/${i18n.language}/about/`}>About</StyledLink></Item>
                <Item><StyledLink to={i18n.language === 'en' ? '/contact/' : `/${i18n.language}/contact/`}>Contact</StyledLink></Item>
                <Item><StyledLink to={i18n.language === 'en' ? '/careers/' : `/${i18n.language}/careers/`}>Careers</StyledLink></Item>
              </List>
            </Nav>
          </Group1>
          <Group2>
            <Email href='mail:hi@floatingdots.com'>hi@floatingdots.com</Email>
            <Address>530 Fifth Ave,<br />Floor9 #13,<br />New York, NY 10036</Address>
          </Group2>
        </Groups>
        <Copyright>&copy; Floating Dots, LLC</Copyright>
      </Inner>
    </Wrapper>
  )
}
export default Footer
