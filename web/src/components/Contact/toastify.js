import React from 'react'
import styled from 'styled-components'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const WrappedToastContainer = ({className, ...rest}) => (
  <div className={className}>
    <ToastContainer {...rest} />
  </div>
)

export default styled(WrappedToastContainer).attrs({
})`
  .Toastify__toast-container {
    font-size: 1.4rem;
    white-space: pre-line;
  }
  .Toastify__toast {
    border-radius: 4px;
  }
  .Toastify__toast--error {}
  .Toastify__toast--warning {}
  .Toastify__toast--success {}
  .Toastify__toast-body {}
  .Toastify__progress-bar {}
`
