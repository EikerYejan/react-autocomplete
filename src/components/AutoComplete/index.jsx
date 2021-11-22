import React, { createRef } from 'react'
import Option from '../Option/Option'
import Loader from '../Loader'
import './AutoComplete.css'
import Skeleton from '../Skeleton/Skeleton'

class AutoComplete extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showOptions: props?.defaultOpen ?? false,
    }
    this.wrapperRef = createRef(null)
    this.debounceTimeout = createRef()
  }

  onWindowClick = (e) => {
    if (this.wrapperRef?.current && !this.wrapperRef.current.contains(e.target)) {
      return this.setState((prev) => ({ ...(prev ?? {}), showOptions: false }))
    }
  }

  onHandleClick = () => {
    return this.setState((prev) => ({ ...(prev ?? {}), showOptions: !prev.showOptions }))
  }

  onOptionClick = (selectedOption) => {
    if (this.props?.onSelect) this.props.onSelect(selectedOption)

    return this.setState((prev) => ({ ...(prev ?? {}), searchTerm: selectedOption.label, showOptions: false }))
  }

  onSearchChange = (e) => {
    const { value } = e.target
    this.setState((prev) => ({
      ...prev,
      searchTerm: value && value?.length > 0 ? value : undefined,
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

  componentDidMount() {
    window.addEventListener('mousedown', this.onWindowClick)
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.onWindowClick)
  }

  render() {
    const { showOptions, searchTerm, matchedOptions } = this.state
    const { label, placeholder, options, loading } = this.props

    const optionsToShow = typeof searchTerm === 'string' && typeof searchTerm.length > 0 ? matchedOptions : options

    const renderContent = () => {
      if (loading)
        return Array(9)
          .fill(0)
          .map((_, i) => <Skeleton key={i} />)

      if (!optionsToShow || optionsToShow.length === 0)
        return (
          <li data-testid="autocomplete-no-data-item" className="AutoComplete__empty-options">
            No data available
          </li>
        )

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
            onChange={this.onSearchChange}
            value={searchTerm}
            placeholder={placeholder}
            type="text"
            className="AutoComplete__input"
            data-testid="autocomplete-input"
          />
          {loading && <Loader data-testid="autocomplete-loader" className="AutoComplete__loader" />}
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

export default AutoComplete
