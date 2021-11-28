import React from 'react'
import AutoComplete from './AutoComplete'
import mockOptions from '../mocks/characters.json'
import { getMatch } from '../utils'

class MockDataAutoComplete extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      options: mockOptions.data,
    }
  }

  onSearch = (value) => {
    return getMatch(value, this.state.options)
  }

  render() {
    return (
      <AutoComplete
        typingTimeout={0}
        loading={this.state.loading}
        onSearch={this.onSearch}
        options={this.state.options}
        label="Marvel Characters (Local Data)"
        placeholder="Type a name"
      />
    )
  }
}

export default MockDataAutoComplete
