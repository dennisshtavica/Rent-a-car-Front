import React from "react";
import PropTypes from "prop-types";
import "../scss/components/_reusableButton.scss"

export default function ReusableButton({ padding, children }) {
  const buttonStyle = {
    padding
  };


  return (
    <button className="reusable-button" style={buttonStyle}>
        {children}
    </button>
  )

}

ReusableButton.propTypes = {
    padding: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
}
