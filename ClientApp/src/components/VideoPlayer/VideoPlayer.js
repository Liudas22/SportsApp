import React from "react"
import ReactPlayer from "react-player"
import PropTypes from "prop-types"

function VideoPlayer({url}) {
    return(
        <div className="vh-100">
            <ReactPlayer url={url} width="25%" height="25%"/>
        </div>
    )
}

VideoPlayer.propTypes = {
    url: PropTypes.string.isRequired
}
export { VideoPlayer }