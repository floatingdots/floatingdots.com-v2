import React from 'react'
import styled from 'styled-components'
import {useTranslation} from 'react-i18next'

import Preview from './preview'
import {colors} from '../../lib/variables'
import BackButton from '../shared/backButton'

const Wrapper = styled.section`
  display: block;
  margin: 4rem 0 0 0;
  @media (min-width: 768px) {
    margin: 8rem 0 0 0;
  }`

const List = styled.ul`
  display: block;
  position: relative;
  margin: 1.6rem 0 0 0;
`

const Item = styled.li`
  display: block;
  margin: 0 0 8rem 0;
  @media (min-width: 768px) {
    margin: 0 0 12.8rem 0;
  }
`

const Heading = styled.span`
  font-size: 3.6rem;
  font-weight: 700;
  color: ${colors.lightBlack};
  display: block;
  width: 100%;
  margin: 0 0 8rem 0;
  text-align: center;
  @media (min-width: 768px) {
    font-size: 4.8rem;
    margin:0 0 12.8rem 0;
 }
`

function BlogArchives (props) {
  const {t} = useTranslation('common')

  return (
    <Wrapper>
      <BackButton label={t('Back to Home')} to='/' />

      <Heading>Blog</Heading>
      <List>
        {props.nodes &&
          props.nodes.map(node => (
            <Item key={node.id} >
              <Preview {...node} />
            </Item>
          ))}
      </List>
    </Wrapper>
  )
}

BlogArchives.defaultProps = {
  nodes: []
}

export default BlogArchives
