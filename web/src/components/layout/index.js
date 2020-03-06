import React from 'react'
import styled, {createGlobalStyle} from 'styled-components'
import {colors, fontfamily} from '../../lib/variables'

import Header from './header'
import MobileNav from './mobile-nav'
import Footer from './footer'

const GlobalStyle = createGlobalStyle`
  /* Box sizing rules */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* Remove default padding */
  ul[class],
  ol[class] {
    padding: 0;
  }

  /* Remove default margin */
  body,
  h1,
  h2,
  h3,
  h4,
  p,
  /* ul[class],
  ol[class], */
  ul,
  ol,
  li,
  figure,
  figcaption,
  blockquote,
  dl,
  dd {
    margin: 0;
  }

  /* Set core body defaults */
  body {
    min-height: 100vh;
    scroll-behavior: smooth;
    line-height: 1.5;
    overflow-x: hidden;
    background: #fafafa;
  }

  /* Remove list styles on ul, ol elements with a class attribute */
  ul[class],
  ol[class] {
    list-style: none;
  }

  /* A elements that don't have a class get default styles */
  a:not([class]) {
    text-decoration-skip-ink: auto;
  }

  /* Make images easier to work with */
  img,
  iframe {
    max-width: 100%;
    display: block;
  }

  /* Natural flow and rhythm in articles by default */
  article > * + * {
    margin-top: 1em;
  }

  /* Inherit fonts for inputs and buttons */
  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  div[class^="portableText__"] {
    /* max-width: 680px; */
    /* margin: 0 auto; */
  }

  /* Remove all animations and transitions for people that prefer not to see them */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  html {
    font-size: 62.5%;
    line-height: 1.5;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    color: ${colors.black};
    font-family: ${fontfamily.en};
    overflow-x: hidden;
  }
  [lang]:lang(ja){
    font-family: ${fontfamily.ja};
  }

  p {
    font-size: 1.6rem;
    margin-bottom: 3.2rem;
    line-height: 1.75;
    &:last-child {
      margin-bottom: 0;
    }
  }

  a {
    color: ${colors.blue};
    :hover{
      opacity: 0.7;
    }
  }
`

const Wrapper = styled.main`
  margin: 0 auto;
  max-width: 1024px;
  min-height: 60vh;
  padding: 64px 16px 0;
  @media (min-width: 768px) {
    padding: 64px 32px 0;
  }
`

const Wrap = styled.div`
  &.navActive{
    height: 100vh;
    overflow-y: hidden;
  }
`

function Layout ({props, children, onHideNav, onShowNav, showNav, isHome}) {
  return (
    <Wrap className={(showNav && 'navActive')}>
      <GlobalStyle />
      <Header
        onHideNav={onHideNav}
        onShowNav={onShowNav}
        showNav={showNav}
      />
      <MobileNav
        onHideNav={onHideNav}
        onShowNav={onShowNav}
        showNav={showNav}
      />
      <Wrapper className={(isHome && 'home')}>{children}</Wrapper>
      <Footer />
    </Wrap>
  )
}
export default Layout
