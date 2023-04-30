import React from 'react'
import { render, screen } from '@testing-library/react'
import Participantes from './Participantes'

test('renders login page', () => {
  render(<Participantes />)
  const linkElement = screen.getByText(/TeamsList/i)
  expect(linkElement).toBeInTheDocument()
})
