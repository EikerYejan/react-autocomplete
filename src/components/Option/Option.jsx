import React from 'react'
import './Option.css'

class Option extends React.Component {
  render() {
    const { label, isSelected, searchTerm, ...restProps } = this.props
    const content =
      typeof searchTerm === `string`
        ? label.replace(new RegExp(searchTerm, 'i'), `<span class="option-highlight" >${searchTerm}&nbsp;</span>`)
        : label

    return (
      <li
        {...restProps}
        title={label}
        className={`option ${isSelected && 'is--selected'}`}
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    )
  }
}

export default Option
