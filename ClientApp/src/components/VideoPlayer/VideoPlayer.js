import React from "react"
// import ReactPlayer from "react-player"
import PropTypes from "prop-types"

function VideoPlayer({url}) {
    return(
        <div>
            {url}
            {/* <ReactPlayer url={url} width="100%" height="100%"/> */}
        </div>
    )
}

VideoPlayer.propTypes = {
    url: PropTypes.string.isRequired
}
export { VideoPlayer }