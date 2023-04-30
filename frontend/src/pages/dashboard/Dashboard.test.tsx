import React from 'react'
import { render, screen } from '@testing-library/react'
import Dashboard from './Dashboard'

test('renders login page', () => {
  render(<Dashboard />)
  const linkElement = screen.getByText(/TeamsList/i)
  expect(linkElement).toBeInTheDocument()
})
