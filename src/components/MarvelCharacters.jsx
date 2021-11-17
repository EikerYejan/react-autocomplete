import React from 'react'
import AutoComplete from './AutoComplete'
import mockOptions from '../mocks/characters.json'
import { getMatch, timeout } from '../utils'

class MarvelCharacters extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      options: mockOptions.data,
    }
  }

  onSearch = async (value) => {
    this.setState((prev) => ({ ...prev, loading: true }))

    await timeout(2000)

    this.setState((prev) => ({ ...prev, loading: false }))
    return Promise.resolve(getMatch(value, this.state.options))
  }

  async componentDidMount() {
    await timeout(2500)

    this.setState({ loading: false })
  }

  render() {
    return (
      <AutoComplete
        loading={this.state.loading}
        onSearch={this.onSearch}
        options={this.state.options}
        label="Marvel Characters"
        placeholder="Type a name"
      />
    )
  }
}

export default MarvelCharacters
