import React from 'react'
import AutoComplete from './AutoComplete'
import { formatCharacher } from '../utils'
import { fetchCharacters } from '../services/MarvelAPI'

class APIDataAutoComplete extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      options: [],
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async (value) => {
    try {
      this.setState((prev) => ({ ...prev, loading: true }))

      const { characters = [] } = await fetchCharacters(
        value && value.length > 0 ? { nameStartsWith: value } : {},
      )
      const formattedData = characters.map(formatCharacher)

      this.setState((prev) => ({ ...prev, loading: false, options: formattedData }))

      return formattedData
    } catch (error) {
      this.setState((prev) => ({ ...prev, loading: false }))

      throw error
    }
  }

  render() {
    const { loading, options } = this.state

    return (
      <AutoComplete
        loading={loading}
        onSearch={this.fetchData}
        options={options}
        label="Marvel Characters (API Data)"
        placeholder="Type a name"
      />
    )
  }
}

export default APIDataAutoComplete
