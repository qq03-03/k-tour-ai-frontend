import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import Header from './Header.jsx'

describe('Header', () => {
  it('renders the logo text', () => {
    render(<MemoryRouter><Header /></MemoryRouter>)
    expect(screen.getByText('K-Tour AI')).toBeInTheDocument()
  })

  it('links to home and about', () => {
    render(<MemoryRouter><Header /></MemoryRouter>)
    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute('href', '/about')
  })
})
