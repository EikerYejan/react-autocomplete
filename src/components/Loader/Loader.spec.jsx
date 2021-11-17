import React from 'react'
import { render } from '@testing-library/react'
import Loader from '.'

describe('<Loader />', () => {
  it('Should render', () => {
    const { baseElement } = render(<Loader />)

    expect(baseElement).toBeInTheDocument()
    expect(baseElement).toMatchSnapshot()
  })
})
