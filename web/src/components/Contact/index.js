import React from 'react'
import styled from 'styled-components'

import Divider from '../shared/divider'

import Heading from './heading'
import Form from './form'
import Email from './email'
import Office from './office'

const Wrapper = styled.article`
  display: block;
  margin: 4rem 0 0 0;
  @media (min-width: 768px) {
    margin: 8rem 0 0 0;
  }
`

const Contact = props => {
  return (
    <Wrapper>
      <Heading />
      <Form />
      <Email {...props} />
      <Divider />
      <Office {...props} />
    </Wrapper>
  )
}
export default Contact
