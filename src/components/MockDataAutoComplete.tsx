import React from 'react'
import AutoComplete from './AutoComplete'
import mockOptions from '../mocks/characters.json'
import { getMatch } from '../utils'
import { Option } from '../types'

type Props = React.ComponentProps<typeof AutoComplete>
type State = {
  loading: boolean
  options: Option[]
}

class MockDataAutoComplete extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      loading: false,
      options: mockOptions.data,
    }
  }

  onSearch = (value?: string) => {
    return value && value.length > 0 ? getMatch(value, this.state.options) : []
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
