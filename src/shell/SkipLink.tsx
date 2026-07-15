'use client'

export function SkipLink() {
  return (
    <a
      href="#main-content"
      style={{
        position: 'absolute',
        top: '-100%',
        left: 8,
        zIndex: 9999,
        padding: '8px 16px',
        background: 'var(--surface)',
        color: 'var(--ink)',
        fontFamily: 'var(--font-body)',
        fontWeight: 600,
        fontSize: 'var(--type-small)',
        borderRadius: 'var(--radius-pill)',
        border: '2px solid var(--solar)',
        textDecoration: 'none',
        transition: 'top 0.1s',
      }}
      onFocus={(e) => (e.currentTarget.style.top = '8px')}
      onBlur={(e) => (e.currentTarget.style.top = '-100%')}
    >
      Skip to content
    </a>
  )
}
