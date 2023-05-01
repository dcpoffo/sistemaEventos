import React from 'react'
import { render, screen } from '@testing-library/react'
import ListaParticipantes from './ListaParticipantes'

test('renders login page', () => {
  render(<ListaParticipantes />)
  const linkElement = screen.getByText(/TeamsList/i)
  expect(linkElement).toBeInTheDocument()
})
