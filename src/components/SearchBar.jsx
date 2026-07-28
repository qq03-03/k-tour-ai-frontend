import { useState } from 'react'

export default function SearchBar({ initialValue = '', onSearch }) {
  const [value, setValue] = useState(initialValue)

  function submit() {
    onSearch(value.trim())
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') submit()
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', borderRadius: 16, padding: '14px 18px', boxShadow: '0 10px 30px rgba(37,99,235,.15)' }}>
      <span>🔍</span>
      <input
        style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14 }}
        placeholder="Search Destination..."
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={submit} aria-label="search" style={{ border: 'none', background: 'var(--color-primary)', color: 'white', borderRadius: 20, padding: '8px 16px', fontWeight: 700 }}>
        Search
      </button>
    </div>
  )
}
