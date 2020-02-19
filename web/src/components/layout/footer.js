import React from 'react'
import {Link} from 'gatsby'
import styled from 'styled-components'

import {colors, font, fontfamily} from '../../lib//variables'

const Wrapper = styled.footer`
  display: block;
  position: relative;
  z-index: 50;
  background: ${colors.black};
  color: ${colors.white};
  padding: 2.4rem 1.6rem 4rem 1.6rem;
  @media (min-width: 1024px) {
    padding-top: 8rem;
    margin-top: 8rem;
  }
`

const Inner = styled.div`
  display: block;
  max-width: 1024px;
  margin: 0 auto;
`

const Title = styled.span`
  font-family: ${fontfamily.handwriting};
  display: block;
  font-size: 1.8rem;
`
const SubTitle = styled.span`
  font-family: ${fontfamily.handwriting};
  display: block;
  font-size: 1.0rem;
`

const Header = styled.div`
  display: block;
  margin: 0 0 2.4rem 0;
`

const Nav = styled.nav`
  display: block;
`

const List = styled.ul`
  display: block;
  font-family: ${fontfamily.handwriting};
  font-size: ${props => !props.small ? '3.4rem' : '1.4rem'};
  /* font-weight: ${props => !props.small ? '700' : '400'}; */
  margin-bottom:  ${props => !props.small ? '4.0rem' : 'none'};
`

const Item = styled.li`
  margin: 0 0 2.0rem 0;
`

const StyledLink = styled(props => <Link {...props} />)`
  color: white;
  text-decoration: none;
`

const Copyright = styled.span`
  opacity: 0.7;
  font-size: 1.2rem;
  padding-top: 2.4rem;
  display: block;
`

const StyledExternal = styled.a`
  color: ${colors.white};
  text-decoration: none;
`

const Socials = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 0 1.8rem 0;
`

const Social = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 4rem 0 0;
`

const Icon = styled.img`
  display: block;
  width: 32px;
`

const Small = styled.span`
  font-size: 1.2rem;
  margin: 0 0 0 2.4rem;
  opacity: 0.8;
  font-family: ${fontfamily.ja};
`

class Footer extends React.Component {
  render () {
    return (
      <Wrapper>
        <Inner>
          <Nav>
            <List>
              {/* <Item><StyledLink to='/news/'>News</StyledLink></Item> */}
            </List>
          </Nav>
          <Copyright>&copy; Floating Dots, LLC</Copyright>
        </Inner>
      </Wrapper>
    )
  }
}
export default Footer
