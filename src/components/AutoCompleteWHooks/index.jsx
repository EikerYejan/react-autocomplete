import React, { useState, useRef, useEffect } from 'react'
import Option from '../Option/Option'
import Loader from '../Loader'
import '../AutoComplete/AutoComplete.css'

const AutoCompleteWithHooks = (props) => {
  const [showOptions, setShowOptions] = useState(props?.defaultOpen ?? false)
  const [searchTerm, setSearchTerm] = useState()
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
    const { value } = e.target

    setSearchTerm(value)

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current)
    debounceTimeout.current = setTimeout(onSearchFinish, 500, value)
  }

  useEffect(() => {
    window.addEventListener('mousedown', onWindowClick)

    return () => window.removeEventListener('mousedown', onWindowClick)
  }, [])

  const optionsToShow = typeof searchTerm === 'string' ? matchedOptions : options

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
        {loading ? (
          <Loader className="AutoComplete__loader" />
        ) : (
          <button onClick={onHandleClick} type="button" title="Expand" className="AutoComplete__expand">
            <img src={`/images/${showOptions ? 'expand_up' : 'expand'}.svg`} alt="expand" />
          </button>
        )}
      </div>
      {showOptions && (
        <ul className="AutoComplete__options">
          {!optionsToShow || optionsToShow.length === 0 ? (
            <li className="AutoComplete__empty-options">No data available</li>
          ) : (
            optionsToShow.map((option) => (
              <Option
                searchTerm={searchTerm}
                isSelected={option.label === searchTerm || option.value === searchTerm}
                onClick={() => onOptionClick(option)}
                key={option.value}
                {...option}
              />
            ))
          )}
        </ul>
      )}
    </div>
  )
}

export default AutoCompleteWithHooks
