import React, { createRef } from 'react'
import PropTypes from 'prop-types'
import Option from '../Option/Option'
import Loader from '../Loader'
import './AutoComplete.css'
import Skeleton from '../Skeleton/Skeleton'
import { sortByMatch } from '../../utils'

class AutoComplete extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showOptions: props?.defaultOpen ?? false,
      searchTerm: '',
      hasSelection: false,
    }
    this.wrapperRef = createRef(null)
    this.inputRef = createRef(null)

    this.debounceTimeout = createRef()
  }

  componentDidMount() {
    window.addEventListener('mousedown', this.onWindowClick)
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.onWindowClick)
  }

  onWindowClick = (e) => {
    if (this.wrapperRef?.current && !this.wrapperRef.current.contains(e.target)) {
      return this.setState((prev) => ({ ...(prev ?? {}), showOptions: false }))
    }

    return null
  }

  onHandleClick = () => {
    return this.setState((prev) => ({ ...(prev ?? {}), showOptions: !prev.showOptions }))
  }

  onOptionClick = (selectedOption) => {
    if (this.props?.onSelect) this.props.onSelect(selectedOption)

    return this.setState((prev) => ({
      ...(prev ?? {}),
      searchTerm: selectedOption.label,
      showOptions: false,
      hasSelection: true,
    }))
  }

  onSearchChange = (e) => {
    const { value = '' } = e.target
    this.setState((prev) => ({
      ...prev,
      searchTerm: value,
      hasSelection: false,
    }))

    if (this.debounceTimeout.current) clearTimeout(this.debounceTimeout.current)
    this.debounceTimeout.current = setTimeout(this.onSearchFinish, 500, value)
  }

  onSearchFinish = async (value) => {
    const matchedOptions = await this.props.onSearch(value)

    return this.setState((prev) => ({
      ...prev,
      showOptions: true,
      matchedOptions,
    }))
  }

  onClear = () => {
    this.setState((prev) => ({ ...prev, searchTerm: '', hasSelection: false }))

    if (this.inputRef.current) this.inputRef.current.focus()
  }

  render() {
    const { showOptions, searchTerm, matchedOptions, hasSelection } = this.state
    const { label, placeholder, options, loading, allowClear } = this.props

    const optionsToShow = sortByMatch(
      searchTerm,
      typeof searchTerm === 'string' && typeof searchTerm.length > 0 ? matchedOptions : options,
    )

    const renderContent = () => {
      if (loading) {
        return Array(9)
          .fill(0)
          .map((_, i) => <Skeleton key={i} />)
      }

      if (!optionsToShow || optionsToShow.length === 0) {
        return (
          <li data-testid="autocomplete-no-data-item" className="AutoComplete__empty-options">
            No data available
          </li>
        )
      }

      return optionsToShow.map((option) => (
        <Option
          searchTerm={searchTerm}
          data-testid="autocomplete-option"
          isSelected={option.label === searchTerm || option.value === searchTerm}
          onClick={() => this.onOptionClick(option)}
          key={option.value}
          {...option}
        />
      ))
    }

    return (
      <div ref={this.wrapperRef} className="AutoComplete__">
        <p className="AutoComplete__label">{label}</p>
        <div className="AutoComplete__handle">
          <input
            ref={this.inputRef}
            onChange={this.onSearchChange}
            value={searchTerm}
            placeholder={placeholder}
            type="text"
            className="AutoComplete__input"
            data-testid="autocomplete-input"
          />
          {loading && <Loader data-testid="autocomplete-loader" className="AutoComplete__loader" />}
          {hasSelection && allowClear && !loading && (
            <button
              onClick={this.onClear}
              className="Autocomplete-clear"
              type="button"
              title="Clear"
            >
              &times;
            </button>
          )}
          <button
            data-testid="autocomplete-handle"
            onClick={this.onHandleClick}
            type="button"
            title="Expand"
            className="AutoComplete__expand"
          >
            <img src={`/images/${showOptions ? 'expand_up' : 'expand'}.svg`} alt="expand" />
          </button>
        </div>
        {showOptions && <ul className="AutoComplete__options">{renderContent()}</ul>}
      </div>
    )
  }
}

AutoComplete.propTypes = {
  loading: PropTypes.bool,
  onSearch: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onSelect: PropTypes.func,
  defaultOpen: PropTypes.bool,
  allowClear: PropTypes.bool,
}

AutoComplete.defaultProps = {
  loading: false,
  label: null,
  placeholder: null,
  defaultOpen: false,
  onSelect: null,
  allowClear: true,
}

export default AutoComplete
