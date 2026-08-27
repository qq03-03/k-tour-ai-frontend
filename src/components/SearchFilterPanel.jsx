import { useState } from 'react'
import { seasons } from '../data/seasons.js'
import { themes } from '../data/themes.js'
import { dramaGenres, genres } from '../data/dramaGenres.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'

const allDramaTitles = Object.keys(dramaGenres)

function toggle(list, value) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value]
}

export default function SearchFilterPanel({ seasons: selectedSeasons, themeIds, genres: selectedGenres, dramas, onApply, onClose }) {
  const { lang, t } = useLanguage()
  const [draftSeasons, setDraftSeasons] = useState(selectedSeasons)
  const [draftThemeIds, setDraftThemeIds] = useState(themeIds)
  const [draftGenres, setDraftGenres] = useState(selectedGenres)
  const [draftDramas, setDraftDramas] = useState(dramas)
  const [dramaSearch, setDramaSearch] = useState('')

  const visibleDramaTitles = allDramaTitles.filter((title) => title.includes(dramaSearch))

  function handleApply() {
    onApply({ seasons: draftSeasons, themeIds: draftThemeIds, genres: draftGenres, dramas: draftDramas })
  }

  return (
    <div style={{ background: 'white', borderRadius: 16, padding: '20px', boxShadow: '0 8px 24px rgba(15,23,42,.12)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0 }}>{t('filter_panel_title')}</h3>
        <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 14, cursor: 'pointer' }}>
          {t('filter_close')}
        </button>
      </div>

      <section style={{ marginBottom: 16 }}>
        <h4 style={{ fontSize: 13, margin: '0 0 8px' }}>{t('filter_season')}</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {seasons.map((season) => (
            <label key={season.id} style={{ fontSize: 12.5, display: 'flex', alignItems: 'center', gap: 4 }}>
              <input
                type="checkbox"
                checked={draftSeasons.includes(season.id)}
                onChange={() => setDraftSeasons((current) => toggle(current, season.id))}
              />
              {season.label[lang]}
            </label>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 16 }}>
        <h4 style={{ fontSize: 13, margin: '0 0 8px' }}>{t('filter_theme')}</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {themes.map((theme) => (
            <label key={theme.id} style={{ fontSize: 12.5, display: 'flex', alignItems: 'center', gap: 4 }}>
              <input
                type="checkbox"
                checked={draftThemeIds.includes(theme.id)}
                onChange={() => setDraftThemeIds((current) => toggle(current, theme.id))}
              />
              {theme.label[lang]}
            </label>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 16 }}>
        <h4 style={{ fontSize: 13, margin: '0 0 8px' }}>{t('filter_genre')}</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {genres.map((genre) => (
            <label key={genre.id} style={{ fontSize: 12.5, display: 'flex', alignItems: 'center', gap: 4 }}>
              <input
                type="checkbox"
                checked={draftGenres.includes(genre.id)}
                onChange={() => setDraftGenres((current) => toggle(current, genre.id))}
              />
              {t(genre.labelKey)}
            </label>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 16 }}>
        <h4 style={{ fontSize: 13, margin: '0 0 8px' }}>{t('filter_drama_movie')}</h4>
        <input
          type="search"
          placeholder={t('filter_drama_search_placeholder')}
          value={dramaSearch}
          onChange={(event) => setDramaSearch(event.target.value)}
          style={{ width: '100%', padding: '6px 10px', borderRadius: 8, border: '1px solid #e2e8f0', marginBottom: 8, fontSize: 12.5 }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 160, overflowY: 'auto' }}>
          {visibleDramaTitles.map((title) => (
            <label key={title} style={{ fontSize: 12.5, display: 'flex', alignItems: 'center', gap: 4 }}>
              <input
                type="checkbox"
                checked={draftDramas.includes(title)}
                onChange={() => setDraftDramas((current) => toggle(current, title))}
              />
              {title}
            </label>
          ))}
        </div>
      </section>

      <button
        onClick={handleApply}
        style={{ width: '100%', background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: 12, padding: '10px 16px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
      >
        {t('filter_apply')}
      </button>
    </div>
  )
}
