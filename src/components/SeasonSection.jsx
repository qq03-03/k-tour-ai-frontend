import { seasons } from '../data/seasons.js'

export default function SeasonSection({ selectedId, onSelect }) {
  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      {seasons.map((season) => {
        const active = season.id === selectedId
        return (
          <div
            key={season.id}
            role="button"
            tabIndex={0}
            onClick={() => onSelect(active ? null : season.id)}
            style={{
              background: active ? 'var(--color-accent)' : '#fff',
              color: active ? 'white' : 'var(--color-text)',
              border: '1px solid #e2e8f0',
              borderRadius: 14,
              padding: '10px 14px',
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            <span aria-hidden="true">{season.icon}</span> <span>{season.label}</span>
          </div>
        )
      })}
    </div>
  )
}
