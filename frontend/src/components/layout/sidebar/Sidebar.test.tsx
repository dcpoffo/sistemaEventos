import React from 'react'
import { render, screen } from '@testing-library/react'
import Sidebar from './Sidebar'

test('renders login page', () => {
  render(<Sidebar />)
  const linkElement = screen.getByText(/TeamsList/i)
  expect(linkElement).toBeInTheDocument()
})
