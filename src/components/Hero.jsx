import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function Hero() {
  const { t } = useLanguage()
  return (
    <div style={{ background: 'linear-gradient(135deg,#2563EB,#1d4ed8)', padding: '48px 24px 64px', textAlign: 'center', color: 'white' }}>
      <h1 style={{ fontSize: 26, margin: '0 0 8px', fontWeight: 800, whiteSpace: 'pre-line' }}>
        {t('hero_title')}
      </h1>
      <p style={{ fontSize: 14, opacity: 0.9, margin: 0 }}>{t('hero_subtitle')}</p>
    </div>
  )
}
