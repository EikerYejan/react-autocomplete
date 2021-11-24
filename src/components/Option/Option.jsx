/* eslint-disable react/no-danger */
import React from 'react'
import PropTypes from 'prop-types'
import './Option.css'

const Option = (props) => {
  const { label, isSelected, searchTerm, ...restProps } = props

  const getTextWithHighlights = (text, searchText) => {
    const regex = new RegExp(searchText, 'gi')
    const newText = text.replace(regex, '<mark class="option-highlight">$&</mark>')

    return newText
  }

  const content = getTextWithHighlights(label, searchTerm)

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
