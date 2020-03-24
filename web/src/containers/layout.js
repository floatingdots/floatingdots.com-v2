import React, {useState} from 'react'
import Layout from '../components/layout'

function LayoutContainer (props) {
  const [showNav, setShowNav] = useState(false)
  const [hideLangSwitchBanner, setHideLangSwitchBanner] = useState(false)

  function handleShowNav () {
    setShowNav(true)
  }

  function handleHideNav () {
    setShowNav(false)
  }

  function handleHideLangSwitchBanner () {
    setHideLangSwitchBanner(true)
  }

  return (
    <Layout
      {...props}
      showNav={showNav}
      onHideNav={handleHideNav}
      onShowNav={handleShowNav}
      onHideLangSwitchBanner={handleHideLangSwitchBanner}
      hideLangSwitchBanner={hideLangSwitchBanner}
    />
  )
}

export default LayoutContainer
