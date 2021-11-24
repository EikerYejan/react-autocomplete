import React from 'react'
import PropTypes from 'prop-types'
import './Loader.css'

const Loader = (props) => (
  <div {...props} className={`loader ${props?.className}`}>
    <div />
    <div />
  </div>
)

Loader.propTypes = {
  className: PropTypes.string,
}

Loader.defaultProps = {
  className: '',
}

export default Loader
