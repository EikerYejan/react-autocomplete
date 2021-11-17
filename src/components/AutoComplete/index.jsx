import React, { createRef } from 'react'
import './AutoComplete.css'
import Option from '../Option/Option'
import Loader from '../Loader'

class AutoComplete extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showOptions: props?.defaultOpen ?? false,
    }
    this.wrapperRef = createRef(null)
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
    return this.setState((prev) => ({ ...(prev ?? {}), searchTerm: selectedOption, showOptions: false }))
  }

  getMatch = (searchTerm) => {
    const regex = new RegExp(searchTerm)

    return this.props.options?.filter((option) => regex.test(option.label))
  }

  onSearchChange = (e) => {
    const matchedOptions = this.getMatch(e.target.value)

    return this.setState((prev) => ({
      ...(prev ?? {}),
      searchTerm: e?.target?.value,
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
    const { label, placeholder, options = [], loading } = this.props
    const optionsToShow = matchedOptions && matchedOptions.length > 0 ? matchedOptions : options

    return (
      <div ref={this.wrapperRef} className={`AutoComplete__ ${loading && 'is--loading'}`}>
        <p className="AutoComplete__label">{label}</p>
        <div className="AutoComplete__handle">
          <input
            onChange={this.onSearchChange}
            value={searchTerm}
            placeholder={placeholder}
            type="text"
            className="AutoComplete__input"
            disabled={loading}
          />
          {loading ? (
            <Loader className="AutoComplete__loader" />
          ) : (
            <button onClick={this.onHandleClick} type="button" title="Expand" class="AutoComplete__expand">
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
                  isSelected={option.label === searchTerm || option.value === searchTerm}
                  onClick={() => this.onOptionClick(option.label)}
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
}

export default AutoComplete
