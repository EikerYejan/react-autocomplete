import React from 'react'
import './Option.css'

class Option extends React.Component {
  render() {
    const { label, isSelected, ...restProps } = this.props

    return (
      <li {...restProps} title={label} className={`option ${isSelected && 'is--selected'}`}>
        {label}
      </li>
    )
  }
}

export default Option
