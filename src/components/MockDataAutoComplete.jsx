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

  onSearch = async (value) => {
    return Promise.resolve(getMatch(value, this.state.options))
  }

  render() {
    return (
      <AutoComplete
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
