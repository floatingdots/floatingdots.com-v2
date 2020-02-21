import React from 'react'
import {Link} from 'gatsby'
import styled from 'styled-components'

import {colors} from '../../lib/variables'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 4rem 0;

  @media (min-width: 1024px) {
    margin: 6rem 0;
  }
`

const StyledLink = styled(props => <Link {...props} />)`
  font-size: 1.8rem;
  display: block;
  border-radius: 4px;
  border: 3px ${colors.black} solid;
  font-weight: 700;
  border-color: ${props => props.color === 'white' ? 'white' : colors.black};
  background-color: ${props => props.color === 'white' ? colors.black : 'white'};
  color: ${props => props.color === 'white' ? 'white' : colors.black};
  text-decoration: none;
  text-align: center;
  width: auto;
  padding: 1rem 2rem;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.15);
`
const AnoterSite = styled.a`
  font-size: 1.8rem;
  display: block;
  border-radius: 4px;
  border: 3px ${colors.black} solid;
  font-weight: 700;
  border-color: ${props => props.color === 'white' ? 'white' : colors.black};
  background-color: ${props => props.color === 'white' ? colors.black : 'white'};
  color: ${props => props.color === 'white' ? 'white' : colors.black};
  text-decoration: none;
  text-align: center;
  width: auto;
  padding: 1rem 2rem;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
`

const Button = props => {
  const {label, to, color, anotherSite} = props
  return (
    <Wrapper>
      {to && !anotherSite &&
      <StyledLink to={to} color={color}>
        {label}
      </StyledLink>
      }
      {to && anotherSite &&
      <AnoterSite href={to} color={color} target='_blank'>
        {label}
      </AnoterSite>
      }

    </Wrapper>
  )
}
export default Button
