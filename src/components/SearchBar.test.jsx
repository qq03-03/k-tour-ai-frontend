import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import SearchBar from './SearchBar.jsx'

describe('SearchBar', () => {
  it('calls onSearch with the typed value when Enter is pressed', async () => {
    const user = userEvent.setup()
    const onSearch = vi.fn()
    render(<SearchBar onSearch={onSearch} />)
    const input = screen.getByPlaceholderText(/search destination/i)
    await user.type(input, 'lotus pond{Enter}')
    expect(onSearch).toHaveBeenCalledWith('lotus pond')
  })

  it('calls onSearch when the search button is clicked', async () => {
    const user = userEvent.setup()
    const onSearch = vi.fn()
    render(<SearchBar onSearch={onSearch} />)
    const input = screen.getByPlaceholderText(/search destination/i)
    await user.type(input, 'duck')
    await user.click(screen.getByRole('button', { name: /search/i }))
    expect(onSearch).toHaveBeenCalledWith('duck')
  })

  it('pre-fills the input from initialValue', () => {
    render(<SearchBar initialValue="autumn trail" onSearch={() => {}} />)
    expect(screen.getByPlaceholderText(/search destination/i)).toHaveValue('autumn trail')
  })
})
