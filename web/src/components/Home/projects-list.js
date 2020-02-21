import React from 'react'
import {Link} from 'gatsby'
import styled from 'styled-components'
import {colors, font, fontfamily} from '../../lib/variables'

import Projects from './projects'

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

function ProjectsList (props) {
  return (
    <Wrapper>
      <List>
        {props.nodes &&
          props.nodes.map(node => (
            <Item key={node._id} >
              <Projects {...node} isInList />
            </Item>
          ))}
      </List>
    </Wrapper>
  )
}

ProjectsList.defaultProps = {
  nodes: []
}

export default ProjectsList
