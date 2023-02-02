import "./Button.css"
import React from "react"
import PropTypes from "prop-types"

export function Button({buttonText}){
    return(
        <button className="Button">{buttonText}</button>
    )
}
Button.propTypes = {
    buttonText: PropTypes.string.isRequired
}