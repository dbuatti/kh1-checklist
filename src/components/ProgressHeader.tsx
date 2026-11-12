interface ProgressHeaderProps {
  total: number
  completed: number
  onReset: () => void
}

export function ProgressHeader({
  total,
  completed,
  onReset,
}: ProgressHeaderProps) {
  const pct = total ? Math.round((completed / total) * 100) : 0

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="brand">
          <span className="brand-mark">KH1</span>
          <span className="brand-name">100% Checklist</span>
        </div>
        <div className="progress">
          <span className="progress-pct">{pct}%</span>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
          <span className="progress-count">
            {completed} / {total} tasks
          </span>
        </div>
        <button className="reset-btn" onClick={onReset}>
          Reset progress
        </button>
      </div>
      <p className="credit">
        Guide structure credited to{' '}
        <a href="https://gamefaqs.gamespot.com/ps4/200737-kingdom-hearts-hd-i5-plus-ii5-remix/faqs/80133/100-story" target="_blank" rel="noopener noreferrer">
          cR0Ck's KH1 HD 100% Story walkthrough
        </a>
      </p>
    </header>
  )
}
