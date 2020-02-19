import React from 'react'
import {Link} from 'gatsby'
import styled from 'styled-components'
import {colors, font, fontfamily} from '../../lib/variables'

import Icon from '../shared/Icon/'
import LangSwitcher from '../shared/langSwitcher'
import logoSvg from '../../../static/logo/logo_header.min.svg'

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
  max-width: $mainWidth;
  margin: 0 auto;
  padding: 0 $spacing-mobile;
  height: auto;
  display: flex;
  justify-content: space-between;
  transition: all 0.2s;
`

const Logo = styled.img`
  width: auto;
  margin: 2px 0 0 0;
`

const StyledLink = styled(props => <Link {...props} />)`
  position: relative;
  display: flex;
  align-items: center;
`

const Header = ({onHideNav, onShowNav, showNav, path}) => (
  <Wrapper>
    <Inner>
      <StyledLink to='/' title='Floating Dots'>
        <Logo src='/logo/logo_header.min.svg' />
      </StyledLink>
      <LangSwitcher />
      {/* <Icon symbol='navicon' onClick={showNav ? onHideNav : onShowNav} className={showNav && 'close'} /> */}
    </Inner>
  </Wrapper>
)

export default Header
