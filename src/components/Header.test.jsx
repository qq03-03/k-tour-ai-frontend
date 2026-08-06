import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import Header from './Header.jsx'
import { renderWithLanguage } from '../test-utils.jsx'

describe('Header', () => {
  it('renders the logo text', () => {
    renderWithLanguage(<MemoryRouter><Header /></MemoryRouter>)
    expect(screen.getByText('K-Tour AI')).toBeInTheDocument()
  })

  it('renders nav labels in Korean by default', () => {
    renderWithLanguage(<MemoryRouter><Header /></MemoryRouter>)
    expect(screen.getByRole('link', { name: '홈' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: '소개' })).toHaveAttribute('href', '/about')
  })

  it('switches nav labels to English when the EN button is clicked', async () => {
    const user = userEvent.setup()
    renderWithLanguage(<MemoryRouter><Header /></MemoryRouter>)
    await user.click(screen.getByRole('button', { name: 'EN' }))
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
  })
})
