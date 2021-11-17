import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AutoComplete from '.'

const options = [
  { label: 'Option 1', value: 'OPT1' },
  { label: 'Option 4', value: 'OPT4' },
  { label: 'Option 5', value: 'OPT5' },
  { label: 'Option 6', value: 'OPT6' },
  { label: 'Option 7', value: 'OPT7' },
  { label: 'Option 8', value: 'OPT8' },
]
const onSearch = jest.fn(() => [])
const onSelect = jest.fn()
const placeHolder = 'Test'
const label = 'Label'

const props = { options, onSearch, onSelect, placeHolder, label }

jest.useFakeTimers()
jest.spyOn(global, 'setTimeout')

describe('<AutoComplete />', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  it('Should render', () => {
    const { baseElement } = render(<AutoComplete {...props} />)

    expect(baseElement).toBeInTheDocument()
  })

  it('Should render loader', () => {
    const { getByTestId } = render(<AutoComplete {...props} loading />)
    const loader = getByTestId('autocomplete-loader')

    expect(loader).toBeInTheDocument()
  })

  it('Should type text', async () => {
    const { getByTestId } = render(<AutoComplete {...props} />)
    const input = getByTestId('autocomplete-input')

    userEvent.type(input, 'S')

    jest.runAllTimers()
    expect(onSearch).toHaveBeenCalledWith('S')
  })

  it('Should render "No Data" component', () => {
    const { options, ...componentProps } = props
    const { getByTestId } = render(<AutoComplete {...componentProps} options={[]} defaultOpen />)
    const element = getByTestId('autocomplete-no-data-item')

    expect(element).toBeInTheDocument()
  })

  it('Should render options list', () => {
    const { getAllByTestId } = render(<AutoComplete {...props} defaultOpen />)
    const options = getAllByTestId('autocomplete-option')
    const option = options[0]

    expect(options.length).toEqual(props.options.length)
    userEvent.click(option)

    expect(onSelect).toHaveBeenCalledWith(props.options[0])
  })

  it('Should show options list when clicking in the handle', () => {
    const { baseElement, getByTestId } = render(<AutoComplete {...props} />)
    const handle = getByTestId('autocomplete-handle')
    userEvent.click(handle)

    expect(baseElement).toMatchSnapshot()
  })
})
