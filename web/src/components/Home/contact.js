import React from 'react'
import styled from 'styled-components'
import {useTranslation} from 'react-i18next'
import Button from '../shared/button'

const Wrapper = styled.section`
  display: block;
  margin: 0 0 8rem 0;
  @media (min-width: 768px) {
    margin: 0 0 12.8rem 0;
  }
`

const Title = styled.h2`
  display: block;
  letter-spacing: 0.05rem;
  font-weight: 700;
  line-height: 1.2;
  font-size: 2.8rem;
  white-space: pre-line;
  @media (min-width: 768px) {
    font-size: 3.8rem;
  }
`

const Contact = (props) => {
  const {t, i18n} = useTranslation('common')
  return (
    <Wrapper>
      <Title>{t('talk')}</Title>
      <Button label={t('contact')} to={i18n.language === 'en' ? '/contact' : `/${i18n.language}/contact`} />
    </Wrapper>
  )
}
export default Contact
