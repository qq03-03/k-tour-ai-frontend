import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', background: '#fff' }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, color: 'var(--color-primary)', fontSize: 18 }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--color-accent)', display: 'inline-block' }} />
        K-Tour AI
      </Link>
      <nav style={{ display: 'flex', gap: 20, fontSize: 14, color: 'var(--color-text-muted)' }}>
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/about">About</Link>
      </nav>
    </header>
  )
}
