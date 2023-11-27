import React from 'react'
import styled from 'styled-components'
import {useTranslation} from 'react-i18next'

import Header from './header'
import Body from './body'
import PositionsList from './positions-list'
import Divider from '../shared/divider'
import BackButton from '../shared/backButton'

const Wrapper = styled.article`
  display: block;
  margin: 8rem 0 0 0;
  @media (min-width: 768px) {
    margin: 8rem 0 0 0;
  }
`

const CareersArchives = props => {
  const {intro, mainImage, body1, body2, body3, body4, positionsNodes} = props
  const {t} = useTranslation('common')

  return (
    <Wrapper>
      <BackButton label={t('Back to Home')} to='/' />

      <Header intro={intro} mainImage={mainImage} />
      <Body bodies={[body1, body2, body3]} />
      <Divider />
      <PositionsList nodes={positionsNodes} />
    </Wrapper>
  )
}
export default CareersArchives
