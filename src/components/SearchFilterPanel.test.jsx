import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import SearchFilterPanel from './SearchFilterPanel.jsx'
import { renderWithLanguage } from '../test-utils.jsx'

function setup(props = {}) {
  const onApply = vi.fn()
  const onClose = vi.fn()
  renderWithLanguage(
    <SearchFilterPanel
      seasons={[]}
      themeIds={[]}
      genres={[]}
      dramas={[]}
      onApply={onApply}
      onClose={onClose}
      {...props}
    />,
  )
  return { onApply, onClose }
}

describe('SearchFilterPanel', () => {
  it('renders season, theme, genre, and drama sections', () => {
    setup()
    expect(screen.getByText('계절')).toBeInTheDocument()
    expect(screen.getByText('테마')).toBeInTheDocument()
    expect(screen.getByText('장르')).toBeInTheDocument()
    expect(screen.getByText('드라마·영화')).toBeInTheDocument()
    expect(screen.getByLabelText('여름')).toBeInTheDocument()
    expect(screen.getByLabelText('야경')).toBeInTheDocument()
    expect(screen.getByLabelText('공포')).toBeInTheDocument()
  })

  it('pre-checks the boxes matching the current selection', () => {
    setup({ seasons: ['summer'], themeIds: ['flower'], genres: ['horror'] })
    expect(screen.getByLabelText('여름')).toBeChecked()
    expect(screen.getByLabelText('꽃')).toBeChecked()
    expect(screen.getByLabelText('공포')).toBeChecked()
    expect(screen.getByLabelText('봄')).not.toBeChecked()
  })

  it('calls onApply with the selected season, theme, and genre ids when submitted', async () => {
    const user = userEvent.setup()
    const { onApply } = setup()

    await user.click(screen.getByLabelText('여름'))
    await user.click(screen.getByLabelText('야경'))
    await user.click(screen.getByLabelText('공포'))
    await user.click(screen.getByRole('button', { name: '선택 조건으로 찾기' }))

    expect(onApply).toHaveBeenCalledWith({
      seasons: ['summer'],
      themeIds: ['night_view'],
      genres: ['horror'],
      dramas: [],
    })
  })

  it('filters the drama checkbox list by the title search box', async () => {
    const user = userEvent.setup()
    setup()

    expect(screen.getByLabelText('선재 업고 튀어')).toBeInTheDocument()
    expect(screen.getByLabelText('사랑의 불시착')).toBeInTheDocument()

    await user.type(screen.getByPlaceholderText('제목·별칭 검색'), '불시착')

    expect(screen.getByLabelText('사랑의 불시착')).toBeInTheDocument()
    expect(screen.queryByLabelText('선재 업고 튀어')).not.toBeInTheDocument()
  })

  it('calls onClose when the close button is clicked', async () => {
    const user = userEvent.setup()
    const { onClose } = setup()

    await user.click(screen.getByRole('button', { name: '닫기' }))

    expect(onClose).toHaveBeenCalled()
  })
})
