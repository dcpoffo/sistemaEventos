import React from 'react'
import { render, screen } from '@testing-library/react'
import ComponenteExemplo from './ComponenteExemplo'

test('renders learn react link', () => {
  render(<ComponenteExemplo message={''} />)
  const linkElement = screen.getByText(/Hello World!!/i)
  expect(linkElement).toBeInTheDocument()
})
