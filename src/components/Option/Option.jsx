/* eslint-disable react/no-danger */
import React from 'react'
import PropTypes from 'prop-types'
import './Option.css'

const Option = (props) => {
  const { label, isSelected, searchTerm, ...restProps } = props
  const highlightHtml = `<span class="option-highlight" >${searchTerm}&nbsp;</span>`
  const content =
    typeof searchTerm === 'string' && searchTerm?.length > 0
      ? label.replace(new RegExp(searchTerm, 'i'), highlightHtml)
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

Option.propTypes = {
  label: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  searchTerm: PropTypes.string,
}

Option.defaultProps = {
  isSelected: false,
  searchTerm: null,
}

export default Option
