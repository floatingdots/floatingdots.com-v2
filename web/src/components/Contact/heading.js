import React from 'react'
import styled from 'styled-components'
import {useTranslation} from 'react-i18next'

import {colors} from '../../lib/variables'

const Wrapper = styled.header`
  margin: 0 0 8rem 0;
`

const Title = styled.h2`
  font-size: 3rem;
  line-height: 1.25;
  color: ${colors.lightBlack};
  margin: 0 0 0.4rem 0;
`

const SubTitle = styled.span`
  font-size: 1.6rem;
  color: ${colors.gray};
`

const Heading = props => {
  const {t} = useTranslation('common')

  return (
    <Wrapper>
      <Title>{t('Just say hi? or Have a project for us?')}</Title>
      <SubTitle>{t('Fill in the form, or send us an email')}</SubTitle>
    </Wrapper>
  )
}

export default Heading
