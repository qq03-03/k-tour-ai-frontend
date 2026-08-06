import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext.jsx'

const LANGUAGE_OPTIONS = [
  { code: 'ko', label: 'KO' },
  { code: 'en', label: 'EN' },
  { code: 'ja', label: 'JA' },
  { code: 'zh', label: 'ZH' },
]

export default function Header() {
  const { lang, setLang, t } = useLanguage()

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', background: '#fff' }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, color: 'var(--color-primary)', fontSize: 18 }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--color-accent)', display: 'inline-block' }} />
        K-Tour AI
      </Link>
      <nav style={{ display: 'flex', gap: 20, alignItems: 'center', fontSize: 14, color: 'var(--color-text-muted)' }}>
        <Link to="/">{t('nav_home')}</Link>
        <Link to="/search">{t('nav_search')}</Link>
        <Link to="/about">{t('nav_about')}</Link>
        <div style={{ display: 'flex', gap: 6 }}>
          {LANGUAGE_OPTIONS.map((option) => (
            <button
              key={option.code}
              onClick={() => setLang(option.code)}
              aria-pressed={lang === option.code}
              style={{
                border: 'none',
                borderRadius: 10,
                padding: '4px 8px',
                fontSize: 11.5,
                fontWeight: 700,
                cursor: 'pointer',
                background: lang === option.code ? 'var(--color-primary)' : '#EFF6FF',
                color: lang === option.code ? 'white' : 'var(--color-primary)',
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </nav>
    </header>
  )
}
