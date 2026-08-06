import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Hero from './Hero.jsx'
import { renderWithLanguage } from '../test-utils.jsx'

describe('Hero', () => {
  it('renders the tagline', () => {
    renderWithLanguage(<Hero />)
    expect(screen.getByText(/K-드라마/)).toBeInTheDocument()
  })
})
