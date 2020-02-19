import React, {useState, useEffect, useRef} from 'react'
import styled from 'styled-components'
import {gsap, TimelineMax, Linear} from 'gsap'
import {CSSPlugin} from 'gsap/CSSPlugin'

const Wrapper = styled.ul`
`
const Item = styled.li`
  opacity: 0;
  position: absolute;
`

const Hero = props => {
  gsap.registerPlugin(CSSPlugin)

  let delay0 = useRef(null)
  let delay1 = useRef(null)
  let delay2 = useRef(null)
  let delay3 = useRef(null)

  const inDuration = 0.25
  const outDuration = 0.25
  const time = 0.7
  const inY = 5
  const outY = -10

  const [timeline] = useState(new TimelineMax({repeat: -1}))
  useEffect(() => {
    timeline
      .fromTo(
        delay0,
        inDuration,
        {
          y: inY,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          ease: Linear.EaseInOut
        }
      )
      .to(delay0, outDuration, {
        y: outY,
        opacity: 0,
        delay: time,
        ease: Linear.EaseInOut
      })
      .fromTo(
        delay1,
        inDuration,
        {
          y: inY,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          ease: Linear.EaseInOut
        }
      )
      .to(delay1, outDuration, {
        y: outY,
        opacity: 0,
        delay: time,
        ease: Linear.EaseInOut
      })
      .fromTo(
        delay2,
        inDuration,
        {
          y: inY,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          ease: Linear.EaseInOut
        }
      )
      .to(delay2, outDuration, {
        y: outY,
        opacity: 0,
        delay: time,
        ease: Linear.EaseInOut
      })
      .fromTo(
        delay3,
        inDuration,
        {
          y: inY,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          ease: Linear.EaseInOut
        }
      )
      .to(delay3, outDuration, {
        y: outY,
        opacity: 0,
        delay: time,
        ease: Linear.EaseInOut
      })
    timeline.play()
  }, [timeline])

  return (
    <Wrapper>
      <Item ref={el => { delay0 = el }} >products📱</Item>
      <Item ref={el => { delay1 = el }} >team 🐶🐹</Item>
      <Item ref={el => { delay2 = el }} >services 🍜</Item>
      <Item ref={el => { delay3 = el }} >company 🏢</Item>
    </Wrapper>
  )
}
export default Hero
