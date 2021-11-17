import React from 'react'
import './Option.css'

class Option extends React.Component {
  render() {
    const { label, isSelected, searchTerm, ...restProps } = this.props

    return (
      <li {...restProps} title={label} className={`option ${isSelected && 'is--selected'}`} dangerouslySetInnerHTML={{__html:  label.replace(searchTerm, `<span class="option-highlight" >${searchTerm}</span>`)}} />  
    )
  }
}

export default Option
