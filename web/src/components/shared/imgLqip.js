import React from 'react'
import Img from 'gatsby-image'

const ImgLQIP = props => {
  const {id} = props
  return (
    <Img
      {...props}
      className={`img-${id} ${props.className}`}
      placeholderClassName={`lqip lqip-${id}`}
      style={{filter: 'blur(10px)', transition: 'all 300ms ease-in-out'}}
      placeholderStyle={{opacity: '0.5', filter: 'blur(10px)', transform: 'scale(0.8)', transformOrigin: 'center', transition: 'all 200ms ease-in-out'}}
      onLoad={() => { document.querySelectorAll(`.lqip-${id}`).forEach((el) => { el.style.opacity = '0' }); document.querySelectorAll(`.img-${id}`).forEach((el) => { el.style.filter = 'none' }) }}
      fadeIn={false}
    />

  )
}
export default ImgLQIP
