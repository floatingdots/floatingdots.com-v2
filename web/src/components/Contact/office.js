import React from 'react'
import styled from 'styled-components'
import {useTranslation} from 'react-i18next'

import {colors} from '../../lib/variables'

const Wrapper = styled.header`
  margin: 0 0 8rem 0;
  @media (min-width: 1024px) {
    margin: 0 0 12.8rem 0;
  }
`

const Title = styled.h2`
  font-size: 3rem;
  line-height: 1.25;
  color: ${colors.lightBlack};
  margin: 0 0 1.6rem 0;
  /* @media (min-width: 1024px) {
    font-size: 4rem;
  } */
`

const Address = styled.p`
  font-size: 1.8rem;
  font-weight: 500;
  @media (min-width: 1024px) {
    font-size: 1.8rem;
  }
  white-space: pre-line;
`

const GoogleMaps = styled.a`
  font-size: 1.6rem;
  @media (min-width: 1024px) {
    font-size: 1.8rem;
  }
`

const Office = props => {
  const {address, googleMaps} = props
  const {t} = useTranslation('common')

  return (
    <Wrapper>
      <Title>Office</Title>
      <Address>{address}</Address>
      <GoogleMaps href={googleMaps} target='_blank'>{t('OpenInGoogleMaps')}</GoogleMaps>
    </Wrapper>
  )
}

export default Office
