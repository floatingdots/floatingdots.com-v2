import React from 'react'
import styled from 'styled-components'

import {colors} from '../../lib/variables'

const Wrapper = styled.header`
  margin: 0;
`

const Title = styled.span`
  font-size: 2rem;
  color: ${colors.lightBlack};
  display: block;
  font-weight: 700;
  margin: 0 0 0.4rem 0;
`
const MailTo = styled.a`
  font-size: 1.8rem;
  color: ${colors.lightBlack};
`

const Email = props => {
  const {email} = props
  return (
    <Wrapper>
      <Title>Email</Title>
      <MailTo href={`mailto:${email}`}>{email}</MailTo>
    </Wrapper>
  )
}

export default Email
