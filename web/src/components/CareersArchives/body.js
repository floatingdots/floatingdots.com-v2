import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import {colors} from '../../lib/variables'
import PortableText from '../../components/shared/portableText'

const Wrapper = styled.div`
  max-width: 960px;
  margin: 0 auto 8rem auto;
`

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin: 0 0 1.6rem 0;
  line-height: 1.25;
  white-space: pre-wrap;
  @media (min-width: 1024px) {
    font-size: 3.8rem;
  }
`

const Group = styled.div`
  margin: 0 0 8rem 0;
  @media (min-width: 768px) {
    margin: 0 0 12.8rem 0;
  }
`

const Text = styled.div`
  max-width: 80%;
  margin: 0 0 4rem 0;
  font-weight: 500;
  @media (min-width: 768px) {
    max-width: 560px;
  }
`

const CareersBody = props => {
  const {bodies} = props
  return (
    <Wrapper>
      {
        bodies.map((body, i) => {
          return body.title && body.body &&
          <Group key={i}>
            <Title>{body.title.locale}</Title>
            <Text>
              <PortableText blocks={body.body.locale} />
            </Text>
          </Group>
        })
      }
    </Wrapper>
  )
}

export default CareersBody
