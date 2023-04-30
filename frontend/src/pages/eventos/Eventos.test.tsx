import React from 'react'
import { render, screen } from '@testing-library/react'
import Eventos from './Eventos'

test('renders login page', () => {
  render(<Eventos />)
  const linkElement = screen.getByText(/TeamsList/i)
  expect(linkElement).toBeInTheDocument()
})
