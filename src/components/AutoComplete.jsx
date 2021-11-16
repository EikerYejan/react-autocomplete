import React, { createRef } from 'react'
import './AutoComplete.css'
import Option from './Option/Option'

/* Props
 - placeholder
 - common attributes
 - options
*/

const options = [
  { label: 'Option 1', value: 'OPT1' },
  { label: 'Option 2', value: 'OPT2' },
  { label: 'Option 3', value: 'OPT3' },
  { label: 'Option 4', value: 'OPT4' },
  { label: 'Option 5', value: 'OPT5' },
  { label: 'Option 6', value: 'OPT6' },
  { label: 'Option 7', value: 'OPT7' },
  { label: 'Option 8', value: 'OPT8' },
]

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

  onSearchChange = (e) => {
    return this.setState((prev) => ({ ...(prev ?? {}), searchTerm: e?.target?.value, showOptions: true }))
  }

  componentDidMount() {
    window.addEventListener('mousedown', this.onWindowClick)
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.onWindowClick)
  }

  render() {
    const { showOptions, searchTerm } = this.state

    return (
      <div ref={this.wrapperRef} className="AutoComplete__">
        <p className="AutoComplete__label">Country</p>
        <div className="AutoComplete__handle">
          <input
            onChange={this.onSearchChange}
            value={searchTerm}
            placeholder="Type your country"
            type="text"
            className="AutoComplete__input"
          />
          <button onClick={this.onHandleClick} type="button" title="Expand" class="AutoComplete__expand">
            <img src={`/images/${showOptions ? 'expand_up' : 'expand'}.svg`} alt="expand" />
          </button>
        </div>
        {showOptions && (
          <ul className="AutoComplete__options">
            {options.map((option) => (
              <Option
                isSelected={option.label === searchTerm || option.value === searchTerm}
                onClick={() => this.onOptionClick(option.label)}
                key={option.value}
                {...option}
              />
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default AutoComplete
