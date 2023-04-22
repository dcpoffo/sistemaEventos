import React from 'react'
import { render, screen } from '@testing-library/react'
import BaseLayout from './BaseLayout'

test('renders login page', () => {
  render(<BaseLayout />)
  const linkElement = screen.getByText(/TeamsList/i)
  expect(linkElement).toBeInTheDocument()
})
