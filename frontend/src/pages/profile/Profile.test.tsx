import React from 'react'
import { render, screen } from '@testing-library/react'
import Profile from './Profile'

test('renders login page', () => {
  render(<Profile />)
  const linkElement = screen.getByText(/TeamsList/i)
  expect(linkElement).toBeInTheDocument()
})
