import React from 'react'
import styled from 'styled-components'
import {useTranslation} from 'react-i18next'

import Projects from './projects'
import {colors} from '../../lib/variables'
import BackButton from '../shared/backButton'

const Wrapper = styled.section`
  display: block;
  margin: 4rem 0 0 0;
  @media (min-width: 768px) {
    margin: 8rem 0 0 0;
  }
`

const List = styled.ul`
  display: block;
  position: relative;
`

const Item = styled.li`
  margin: 0 0 8rem 0;
  @media (min-width: 768px) {
    margin-bottom: 12.8rem;
  }

`
const Heading = styled.span`
  font-size: 3.6rem;
  font-weight: 700;
  color: ${colors.lightBlack};
  display: block;
  width: 100%;
  margin: 0rem 0 8rem 0;
  text-align: center;
  @media (min-width: 768px) {
    font-size: 4.8rem;
    margin: 0 0 12.8rem 0;
 }
`

function ProjectsArchives (props) {
  const {t} = useTranslation('common')

  return (
    <Wrapper>
      <BackButton label={t('Back to Home')} to='/' />

      <Heading>Projects</Heading>
      <List>
        {props.nodes &&
          props.nodes.map(node => (
            <Item key={node.id}>
              <Projects {...node} />
            </Item>
          ))}
      </List>
    </Wrapper>
  )
}

ProjectsArchives.defaultProps = {
  nodes: []
}

export default ProjectsArchives
