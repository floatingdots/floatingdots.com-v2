import React from 'react'
import {Field, getIn} from 'formik'
import styled from 'styled-components'
import {colors} from '../../../lib/variables'

const InvalidFeedbck = styled.span`
  color: ${colors.red};
  font-size: 1.4rem;
  display: block;
  padding: 0.4rem 0 0 0;
`

const ErrorMessage = ({name}) => (
  <Field name={name}>
    {({field, form, meta}) => {
      const error = getIn(form.errors, name)
      const touch = getIn(form.touched, name)
      return touch && error ? <InvalidFeedbck>{error}</InvalidFeedbck> : null
    }}
  </Field>
)

export default ErrorMessage
