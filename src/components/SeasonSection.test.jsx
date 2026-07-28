import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import SeasonSection from './SeasonSection.jsx'

describe('SeasonSection', () => {
  it('renders all 4 season chips', () => {
    render(<SeasonSection selectedId={null} onSelect={() => {}} />)
    expect(screen.getByText('Spring')).toBeInTheDocument()
    expect(screen.getByText('Summer')).toBeInTheDocument()
    expect(screen.getByText('Autumn')).toBeInTheDocument()
    expect(screen.getByText('Winter')).toBeInTheDocument()
  })

  it('calls onSelect with the season id when a chip is clicked', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<SeasonSection selectedId={null} onSelect={onSelect} />)
    await user.click(screen.getByText('Summer'))
    expect(onSelect).toHaveBeenCalledWith('summer')
  })

  it('calls onSelect with null when the selected chip is clicked again', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<SeasonSection selectedId="summer" onSelect={onSelect} />)
    await user.click(screen.getByText('Summer'))
    expect(onSelect).toHaveBeenCalledWith(null)
  })
})
