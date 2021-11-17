import { render } from '@testing-library/react'
import React from 'react'
import Option from './Option'

describe('<Option />', () => {
  it('Should render', () => {
    const { baseElement } = render(<Option isSelected label="Label" />)

    expect(baseElement).toBeInTheDocument()
    expect(baseElement).toHaveTextContent('Label')
    expect(baseElement).toMatchSnapshot()
  })
})
