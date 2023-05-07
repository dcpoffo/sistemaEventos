import React from 'react'
import { render, screen } from '@testing-library/react'
import EditarParticipante from './EditarParticipante'

test('renders login page', () => {
  render(<EditarParticipante />)
  const linkElement = screen.getByText(/TeamsList/i)
  expect(linkElement).toBeInTheDocument()
})
