import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import ThemeSection from './ThemeSection.jsx'
import { renderWithLanguage } from '../test-utils.jsx'

describe('ThemeSection', () => {
  it('renders all 6 theme tags in Korean by default, without cafe or food', () => {
    renderWithLanguage(<ThemeSection selectedId={null} onSelect={() => {}} />)
    expect(screen.getByText('해변')).toBeInTheDocument()
    expect(screen.getByText('드라마')).toBeInTheDocument()
    expect(screen.queryByText('카페')).not.toBeInTheDocument()
    expect(screen.queryByText('음식')).not.toBeInTheDocument()
  })

  it('calls onSelect with the theme id when a tag is clicked', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    renderWithLanguage(<ThemeSection selectedId={null} onSelect={onSelect} />)
    await user.click(screen.getByText('해변'))
    expect(onSelect).toHaveBeenCalledWith('beach')
  })

  it('renders theme tags in English when the language is set to en', () => {
    window.localStorage.setItem('ktourai_lang', 'en')
    renderWithLanguage(<ThemeSection selectedId={null} onSelect={() => {}} />)
    expect(screen.getByText('Beach')).toBeInTheDocument()
  })
})
