import React from 'react'
import axios from 'axios'
import {useTranslation} from 'react-i18next'
import styled from 'styled-components'
import {FormikProvider, useFormik, Field} from 'formik'
import * as Yup from 'yup'
import ReCAPTCHA from 'react-google-recaptcha'
import {toast} from 'react-toastify'

import {rgba} from 'polished'
import {Debug} from '../../lib/formik-debug'
import {colors} from '../../lib/variables'
import ErrorMessage from '../shared/formik/error'
import Toastify from './toastify'

const recaptchaRef = React.createRef()
const ContactForm = (props) => {
  const {t, i18n} = useTranslation(['form', 'common'])

  const schema = Yup.object().shape({
    name: Yup.string().required(t('Please input your name')),
    email: Yup.string().email(t('Your email address is invalid')).required(t('Please input your email')),
    message: Yup.string().required(t('Please input message'))
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: ''
    },
    validationSchema: schema,
    onSubmit: async (values, {setSubmitting, setStatus, validateForm}) => {
      await validateForm().then(res => {
        setStatus({state: 'Submitting'})
        recaptchaRef.current.execute()
      }).catch(err => {
        console.log(err)
      })
    }})

  const {values, setStatus, status, handleChange, handleBlur, handleSubmit, errors, touched} = formik

  const notifySuccess = () => toast.success(t('Thank you'), {containerId: 'Success'})
  const notifyError = () => toast.error(t('Invalid Email'), {containerId: 'Error'})

  return (
    <FormikProvider value={formik}>
      <Toastify
        enableMultiContainer
        containerId='Success'
        position='top-right'
        autoClose={8000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        pauseOnHover
        className='myToast'
      />
      <Toastify
        enableMultiContainer
        containerId='Error'
        position='top-right'
        autoClose={8000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        pauseOnHover
        className='myToast'
      />

      <Form onSubmit={handleSubmit}>
        <FormGroup className='name'>
          <InputWrap>
            <Input
              variant='standard'
              name='name'
              className={`form-control ${touched.name ? 'is-touched' : ''} ${touched.name && errors.name ? 'is-invalid' : 'is-valid'} ${values.name === '' ? 'is-empty' : ''}`}
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Label className='form-control-label'>{t('Name')}</Label>
          </InputWrap>
          <ErrorMessage name='name' />
        </FormGroup>

        <FormGroup className='email'>
          <InputWrap>
            <Input
              name='email'
              type='email'
              className={`form-control ${touched.email ? 'is-touched' : ''} ${touched.email && errors.email ? 'is-invalid' : 'is-valid'} ${values.email === '' ? 'is-empty' : ''}`}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Label className='form-control-label'>{t('Email')}</Label>
          </InputWrap>
          <ErrorMessage name='email' />
        </FormGroup>

        <FormGroup className='message'>
          <TextareaWrap>
            <Textarea
              as='textarea'
              name='message'
              type='textarea'
              className={`form-control ${touched.message ? 'is-touched' : ''} ${touched.message && errors.message ? 'is-invalid' : 'is-valid'} ${values.message === '' ? 'is-empty' : ''}`}
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Label className='form-control-label'>{t('Message')}</Label>
          </TextareaWrap>
          <ErrorMessage name='message' />
        </FormGroup>

        <FormGroup>
          {typeof window !== 'undefined' &&
          <>
            <ReCAPTCHA
              ref={recaptchaRef}
              size='invisible'
              sitekey='6Ld6i28UAAAAAJ-B0VJRJ2leVhFl7HZtaS95EUHW'
              onChange={(response) => {
                setTimeout(() => {
                  axios.request({
                    method: 'POST',
                    baseURL: '/api/message/contact',
                    headers: {
                      'Content-Type': 'application/json; charset=UTF-8'
                    },
                    data: JSON.stringify({
                      name: values.name,
                      email: values.email,
                      message: values.message,
                      locale: i18n.language,
                      recaptcha: response
                    })
                  }).then((res) => {
                    console.log(res)
                    const {code} = res.data[2]
                    if (!code) {
                      notifySuccess()
                      recaptchaRef.current.reset()
                      setStatus({state: 'Success'})
                      return
                    }
                    if (code === 406) {
                      recaptchaRef.current.reset()
                      notifyError()
                      setStatus({state: 'Error', error: t('Invalid Email')})
                    }
                  }).catch(() => {
                    recaptchaRef.current.reset()
                    setStatus({state: 'Error', error: t('Failed')})
                  })
                  recaptchaRef.current.reset()
                }, 800)
              }}
              onExpired={() => {
                recaptchaRef.current.reset()
              }}
              onErrored={() => {
                recaptchaRef.current.reset()
              }}
            />

            <ErrorMessage name='recaptcha' />
          </>}
        </FormGroup>
        <ButtonWrapper>
          <Button
            type='submit'
            className='btn btn-outline-primary'
            disabled={(status && status.state === 'Submitting') || (status && status.state === 'Success')}
          >
            {(status && status.state === 'Submitting') ? t('Sending') : (status && status.state === 'Success') ? t('Sent') : t('Send')}
          </Button>
          {status && status.error && <Error>{status.error}</Error>}
        </ButtonWrapper>
      </Form>
      {/* <Debug /> */}
    </FormikProvider>
  )
}

const Form = styled.form`
  display: block;
  font-weight: 500;
  max-width: 640px;
  margin: 0 0 8rem 0;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3.2rem;
  transition: all 200ms ease;
`

const InputWrap = styled.div`
  position: relative;
  width: 100%;
`

const TextareaWrap = styled(InputWrap)`
  z-index: 0;
  position: relative;
  &:after{
    content: '';
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    width: calc(100% - 2px);
    margin: 1px;
    border-radius: 5px;
    height: 3.2rem;
    background: white;
    background: linear-gradient(180deg, rgba(255,255,255,1) 70%, rgba(255,255,255,0) 100%) ;
  }
`

const Label = styled.label`
  font-size: ${props => props.small ? '1.2rem' : '1.6rem'};
  position: ${props => props.visible ? 'static' : 'absolute'};
  margin-bottom: ${props => props.visible ? '0.8rem' : '0.4rem'};
  color: ${colors.gray};
  font-weight: 500;
  top: 1.5rem;
  left: 1.4rem;
  transition: all 200ms ease;
  pointer-events: none;
  z-index: 2;
`

const Input = styled(props => <Field {...props} />)`
  color: ${colors.black};
  padding: 1.6rem 1.2rem 0 1.2rem;
  height: 5.4rem;
  border-radius: 5px;
  box-shadow: none;
  border: 1px solid ${colors.gray};
  letter-spacing: 0.075rem;
  font-size: 1.6rem;
  width: 100%;
  outline-color: none;
  outline-width: 0;
  &::placeholder{
    color: ${colors.gray};
  }
  & + .form-control-label{
    top: 0.8rem;
    font-size: 1.2rem;
  }
  &.is-empty + .form-control-label {
    top: 1.5rem;
    font-size: 1.6rem;
  }
  &.is-valid.is-touched + .form-control-label{
    top: 0.8rem;
    font-size: 1.2rem;
    color: ${colors.lightBlack};
  }
  &.is-invalid{
    border-color: ${colors.red};
    background: ${rgba(`${colors.red}`, 0.08)};
    z-index: 1;
    position: relative;
  }
  &.is-invalid + .form-control-label {
    top: 0.8rem;
    font-size: 1.2rem;
    color: ${colors.red};
  }
  &.is-invalid.is-empty + .form-control-label {
    top: 1.5rem;
    font-size: 1.6rem;
    color: ${colors.red};
  }
  &.is-valid.is-touched + .form-control-label {
    top: 0.8rem;
    font-size: 1.2rem;
    color: ${colors.lightBlack};
  }
  &.is-invalid.is-empty:focus + .form-control-label {
    top: 0.8rem;
    font-size: 1.2rem;
    color: ${colors.red};
  }
  &:focus{
    outline:none;
    border-color: ${colors.lightBlue};
    box-shadow: 0 0 2px 2px ${rgba(`${colors.lightBlue}`, 0.25)};
  }
  &:focus + .form-control-label{
    top: 0.8rem;
    font-size: 1.2rem;
  }
`

const Textarea = styled(Input)`
  min-height: 24rem;
  padding-top: 2.4rem;
`

const ButtonWrapper = styled.div`
  margin-bottom: 4rem;
`

const Button = styled.button`
  display: block;
  padding: 1rem 2.4rem;
  width: auto;
  min-width: 120px;
  font-size: 1.8rem;
  font-weight: 500;
  letter-spacing: 0.15rem;
  text-decoration: none;
  text-align: center;
  color: ${colors.lightBlue};
  border: 2px ${colors.lightBlue} solid;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0px 4px 8px 2px ${rgba(`${colors.lightBlue}`, 0.1)};
  cursor: pointer;
  &:disabled{
    color: ${colors.gray};
    border-color: ${colors.gray};
    background: white;
    box-shadow: none;
    cursor: initial;
  }
`

const Error = styled.span`
  color: ${colors.red};
  font-size: 1.8rem;
  margin: 0.8rem 0 0 0;
  display: block;
  white-space: pre-line;
`

export default ContactForm
