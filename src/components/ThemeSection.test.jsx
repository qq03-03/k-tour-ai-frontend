import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import ThemeSection from './ThemeSection.jsx'

describe('ThemeSection', () => {
  it('renders all 8 theme tags', () => {
    render(<ThemeSection selectedId={null} onSelect={() => {}} />)
    expect(screen.getByText('Beach')).toBeInTheDocument()
    expect(screen.getByText('Cafe')).toBeInTheDocument()
    expect(screen.getByText('Drama')).toBeInTheDocument()
  })

  it('calls onSelect with the theme id when a tag is clicked', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<ThemeSection selectedId={null} onSelect={onSelect} />)
    await user.click(screen.getByText('Beach'))
    expect(onSelect).toHaveBeenCalledWith('beach')
  })
})
