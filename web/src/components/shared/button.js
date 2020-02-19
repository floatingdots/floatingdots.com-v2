import React from 'react'
import styled, {css} from 'styled-components'

import {Link} from 'gatsby'
import {colors, font, fontfamily} from '../../lib/variables'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 4rem 0;

  @media (min-width: 1024px) {
    margin: 6rem 0;
  }
`

const StyledLink = styled(props => <Link {...props} />)`
  font-family: ${fontfamily.ja};
  font-size: 1.6rem;
  display: block;
  border-radius: 2px;
  border: 3px ${colors.black} solid;
  font-weight: 700;
  border-color: ${props => props.color === 'white' ? 'white' : colors.black};
  background-color: ${props => props.color === 'white' ? colors.black : 'white'};
  color: ${props => props.color === 'white' ? 'white' : colors.black};
  text-decoration: none;
  text-align: center;
  width: auto;
  padding: 0.8rem 1.4rem;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
`
const AnoterSite = styled.a`
  font-family: ${fontfamily.ja};
  font-size: 1.6rem;
  display: block;
  border-radius: 2px;
  border: 3px ${colors.black} solid;
  font-weight: 700;
  border-color: ${props => props.color === 'white' ? 'white' : colors.black};
  background-color: ${props => props.color === 'white' ? colors.black : 'white'};
  color: ${props => props.color === 'white' ? 'white' : colors.black};
  text-decoration: none;
  text-align: center;
  width: auto;
  padding: 0.8rem 1.4rem;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
`

const Button = props => {
  const {label, link, color, anotherSite} = props
  return (
    <Wrapper>
      {link && !anotherSite &&
      <StyledLink to={link} color={color}>
        {label}
      </StyledLink>
      }
      {link && anotherSite &&
      <AnoterSite href={link} color={color} target='_blank'>
        {label}
      </AnoterSite>
      }

    </Wrapper>
  )
}
export default Button
