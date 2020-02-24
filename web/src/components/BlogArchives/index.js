import React from 'react'
import {Link} from 'gatsby'
import styled from 'styled-components'
import Preview from './preview'
// import Heading from '../heading'
// import Button from '../button'
import {colors} from '../../lib/variables'

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
  @media (min-width: 768px) {
    margin: 0 0 12.8rem 0;
  }
`

const Heading = styled.span`
  font-size: 4rem;
  font-weight: 700;
  color: ${colors.lightBlack};
  display: block;
  width: 100%;
  margin: 0 0 4rem 0;
  @media (min-width: 768px) {
    font-size: 4.8rem;
  }
`

function BlogArchives (props) {
  console.log(JSON.stringify(props.nodes, null, 2))
  return (
    <Wrapper>
      <Heading>Blog</Heading>

      <List>
        {props.nodes &&
          props.nodes.map(node => (
            <Item key={node.id} >
              <Preview {...node} isInList />
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
