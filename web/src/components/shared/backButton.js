import React from 'react'
import {Link} from 'gatsby'
import styled from 'styled-components'
import {useTranslation} from 'react-i18next'

import {colors} from '../../lib/variables'

const Wrapper = styled.div`
  display: inline-block;
  margin: 0 0 4rem 0;
  @media (min-width: 768px) {
    margin: 0 0 8rem 0;
  }
`

const Arrow = styled.div`
  display: block;
  position: relative;
  background-color: ${colors.gray};
  width: 2rem;
  height: 1px;
  border-radius: 1rem;
  margin: 0 1.6rem 0 0;
  &:before {
    transform: rotate(-40deg);
  }
  &:after {
    transform: rotate(40deg);
  }
  &:before, &:after {
    background-color: ${colors.gray};
    display: block;
    content: "";
    position: absolute;
    left: 0;
    width: 1rem;
    height: 1px;
    transform-origin: 0.08rem center;
  }
`

const StyledLink = styled(props => <Link {...props} />)`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.4rem;
  border-radius: 4px;
  border: 1px ${colors.black} solid;
  border-color: ${colors.gray};
  color: ${colors.gray};
  background-color: white;
  text-decoration: none;
  text-align: center;
  width: auto;
  padding: 1rem 2rem;
`

const BackButton = props => {
  const {label, to} = props
  const {i18n} = useTranslation('common')

  return (
    <Wrapper>
      {to &&
        <StyledLink to={i18n.language === 'en' ? `${to}` : `/${i18n.language}${to}`}>
          <Arrow />
          {label}
        </StyledLink>}
    </Wrapper>
  )
}
export default BackButton
