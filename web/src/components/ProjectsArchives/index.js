import React from 'react'
import styled from 'styled-components'
import Projects from './projects'
import {colors} from '../../lib/variables'

const Wrapper = styled.section`
  display: block;
  position: relative;
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
  margin: 8rem 0 8rem 0;
  text-align: center;
  @media (min-width: 768px) {
    font-size: 4.8rem;
    margin: 12.8rem 0 12.8rem 0;
 }
`

function ProjectsArchives (props) {
  return (
    <Wrapper>
      <Heading>Projects</Heading>

      <List>
        {props.nodes &&
          props.nodes.map(node => (
            <Item key={node.id} >
              <Projects {...node} isInList />
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
