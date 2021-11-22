import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import Option from '../Option/Option'
import Loader from '../Loader'
import '../AutoComplete/AutoComplete.css'
import Skeleton from '../Skeleton/Skeleton'

const AutoCompleteWithHooks = (props) => {
  const [showOptions, setShowOptions] = useState(props?.defaultOpen ?? false)
  const [searchTerm, setSearchTerm] = useState('')
  const [matchedOptions, setMatchedOptions] = useState([])

  const debounceTimeout = useRef()
  const wrapperRef = useRef(null)

  const { label, placeholder, options = [], loading, onSearch, onSelect } = props

  const onWindowClick = (e) => {
    if (wrapperRef?.current && !wrapperRef.current.contains(e.target)) {
      return setShowOptions(false)
    }
  }

  const onHandleClick = () => setShowOptions((prev) => !prev)

  const onOptionClick = (selectedOption) => {
    if (onSelect) onSelect(selectedOption)

    setShowOptions(false)
    setSearchTerm(selectedOption.label)
  }

  const onSearchFinish = async (value) => {
    const matchedOptions = await onSearch(value)

    setShowOptions(true)
    setMatchedOptions(matchedOptions)
  }

  const onSearchChange = (e) => {
    const { value = '' } = e.target

    setSearchTerm(value)

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current)
    debounceTimeout.current = setTimeout(onSearchFinish, 500, value)
  }

  useEffect(() => {
    window.addEventListener('mousedown', onWindowClick)

    return () => window.removeEventListener('mousedown', onWindowClick)
  }, [])

  const optionsToShow = typeof searchTerm === 'string' && typeof searchTerm.length > 0 ? matchedOptions : options

  const renderContent = () => {
    if (loading)
      return Array(9)
        .fill(0)
        .map((_, i) => <Skeleton key={i} />)

    if (!optionsToShow || optionsToShow.length === 0)
      return <li className="AutoComplete__empty-options">No data available</li>

    return optionsToShow.map((option) => (
      <Option
        searchTerm={searchTerm}
        isSelected={option.label === searchTerm || option.value === searchTerm}
        onClick={() => onOptionClick(option)}
        key={option.value}
        {...option}
      />
    ))
  }

  return (
    <div ref={wrapperRef} className="AutoComplete__">
      <p className="AutoComplete__label">{label}</p>
      <div className="AutoComplete__handle">
        <input
          onChange={onSearchChange}
          value={searchTerm}
          placeholder={placeholder}
          type="text"
          className="AutoComplete__input"
        />
        {loading && <Loader className="AutoComplete__loader" />}
        <button onClick={onHandleClick} type="button" title="Expand" className="AutoComplete__expand">
          <img src={`/images/${showOptions ? 'expand_up' : 'expand'}.svg`} alt="expand" />
        </button>
      </div>
      {showOptions && <ul className="AutoComplete__options">{renderContent()}</ul>}
    </div>
  )
}

AutoCompleteWithHooks.propTypes = {
  loading: PropTypes.bool,
  onSearch: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
}

export default AutoCompleteWithHooks
