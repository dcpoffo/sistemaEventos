import React from 'react'
import { render, screen } from '@testing-library/react'
import AddParticipantes from './AddParticipantes'

test('renders login page', () => {
  render(<AddParticipantes />)
  const linkElement = screen.getByText(/TeamsList/i)
  expect(linkElement).toBeInTheDocument()
})
