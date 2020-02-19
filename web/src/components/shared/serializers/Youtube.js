import React, {useState, useEffect, useRef} from 'react'
import YouTube from 'react-youtube'
import styled from 'styled-components'
import getYouTubeId from 'get-youtube-id'

const YouTubeWrapper = styled.div`
  overflow:hidden;
  padding-bottom:56.25%;
  position:relative;
  height:0;
`

const StyledYouTube = styled(props => <YouTube {...props} />)`
  left:0;
  top:0;
  height:100%;
  width:100%;
  position:absolute;
`
export default ({node}) => {
  const [youtubeId, setYoutubeId] = useState('')
  const ref = useRef({isMount: false}).current

  if (!node || !node.url) { return null }

  const opts = {
    playerVars: { // https://developers.google.com/youtube/player_parameters
      showinfo: 0,
      autoplay: 0
    }
  }

  useEffect(() => {
    if (!ref.isMount) {
      ref.isMount = true
      setYoutubeId(getYouTubeId(node.url))
    }
  }, [youtubeId])

  return (
    <YouTubeWrapper>
      {youtubeId && <StyledYouTube videoId={youtubeId} opts={opts} />}
    </YouTubeWrapper>
  )
}
