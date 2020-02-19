import React from 'react'
import clientConfig from '../../../lib/client-config'
import BasePortableText from '@sanity/block-content-to-react'
import styled from 'styled-components'
import serializers from './serializers'
import {colors, fontfamily} from '../../lib/variables'

const StyledBasePortableText = styled.div`
  h1,
  h2,
  h3,
  h4{
    text-align: left;
    font-family: ${fontfamily.ja};
    margin-bottom: 2.4rem;
    padding-top: 3.6rem;
    color: ${colors.navy};
    position: relative;
    padding-bottom: 0.8rem;
    font-weight: 700;
  }

  h2{
    font-size: 2.0rem;
  }
  h3{
    font-size: 1.8rem;
    padding-top: 2.4rem;
    margin-bottom: 1.6rem;
    padding-bottom: 0rem;
    & :after{
      display: none;
    }
  }
  h4{
    font-size: 1.6rem;
    padding-top: 1.8rem;
    margin-bottom: 1.4rem;
    padding-bottom: 0rem;
    & :after{
      display: none;
    }
  }

  ul,
  ol{
    font-size: 1.6rem;
    list-style-position: outside;
    margin: 0 0 0 2.6rem;
    padding: 0;
    line-height: 1.75;
  }
  li{
    margin: 0 0 2.4rem 0;
  }
  strong,
  bold{
    color: ${colors.navy};
  }
  a{
    word-break: break-word;
  }
 `

const PortableText = ({blocks}) => (
  <StyledBasePortableText>
    <BasePortableText blocks={blocks} serializers={serializers} {...clientConfig.sanity} />
  </StyledBasePortableText>
)

export default PortableText
