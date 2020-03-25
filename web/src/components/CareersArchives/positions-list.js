import React from 'react'
import styled from 'styled-components'

import Positions from './positions'
import {colors} from '../../lib/variables'
import {useTranslation} from 'react-i18next'

const Wrapper = styled.section`
  display: block;
  position: relative;
`

const List = styled.ul`
  display: block;
  position: relative;
  margin: 1.6rem 0 0 0;
`

const Item = styled.li`
  display: block;
  margin: 0 0 8rem 0;
  @media (min-width: 1024px) {
    margin: 0 0 12.8rem 0;
  }
`

const Heading = styled.span`
  font-size: 3rem;
  font-weight: 700;
  color: ${colors.lightBlack};
  display: block;
  width: 100%;
  margin: 8rem 0 4rem 0;
  @media (min-width: 1024px) {
    font-size: 3.2rem;
    margin: 8rem 0 8rem 0;
 }
`

function CareersPositions (props) {
  const {t} = useTranslation(['common'])
  return (
    <Wrapper>
      <Heading>{t('Open Positions')}</Heading>
      <List>
        {props.nodes &&
          props.nodes.map(node => (
            <Item key={node.id}>
              <Positions {...node} />
            </Item>
          ))}
      </List>
    </Wrapper>
  )
}

CareersPositions.defaultProps = {
  nodes: []
}

export default CareersPositions
