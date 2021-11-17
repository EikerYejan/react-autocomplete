import React from 'react'
import './Loader.css'

class Loader extends React.Component {
  render() {
    return (
      <div {...this.props} className={`loader ${this.props?.className}`}>
        <div />
        <div />
      </div>
    )
  }
}

export default Loader
