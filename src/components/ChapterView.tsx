import { useCallback } from 'react'
import type { Chapter } from '../data/guide'
import { ChecklistItem } from './ChecklistItem'

interface ChapterViewProps {
  chapter: Chapter
  prev: Chapter | null
  next: Chapter | null
  done: Record<string, boolean>
  onToggle: (id: string) => void
  onGoToChapter: (id: string) => void
  onBack: () => void
}

export function ChapterView({
  chapter,
  prev,
  next,
  done,
  onToggle,
  onGoToChapter,
  onBack,
}: ChapterViewProps) {
  const total = chapter.tasks.length
  const completed = chapter.tasks.filter((t) => done[t.id]).length
  const pct = total ? Math.round((completed / total) * 100) : 0
  const kind = chapter.kind

  const header = useCallback(() => onBack(), [onBack])

  return (
    <div className="chapter-view">
      <header className="chapter-header-bar">
        <button className="back-btn" onClick={header}>
          <span className="back-arrow">‹</span>
          <span className="back-label">Chapters</span>
        </button>
        <h1 className={`chapter-view-title chapter-title--${kind}`}>
          {chapter.title}
        </h1>
        <div className="header-spacer" />
      </header>

      {chapter.subtitle ? (
        <p className={`chapter-view-sub chapter-sub--${kind}`}>
          {chapter.subtitle}
        </p>
      ) : null}

      <div className="chapter-progress-strip">
        <span className={`chapter-pct chapter-pct--${kind}`}>{pct}%</span>
        <div className="chapter-bar">
          <div
            className={`chapter-fill chapter-fill--${kind}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="chapter-count">{completed} / {total}</span>
      </div>

      <ul className="task-list">
        {chapter.tasks.map((task) => (
          <li key={task.id}>
            <ChecklistItem
              id={task.id}
              text={task.text}
              note={task.note}
              checked={done[task.id] ?? false}
              onToggle={onToggle}
            />
          </li>
        ))}
      </ul>

      <nav className="chapter-nav">
        {prev ? (
          <button
            className={`nav-btn nav-btn--prev chapter-nav-btn--${prev.kind}`}
            onClick={() => onGoToChapter(prev.id)}
          >
            <span className="nav-arrow">‹</span>
            <span className="nav-label">Previous</span>
            <span className="nav-title">{prev.title}</span>
          </button>
        ) : null}
        {next ? (
          <button
            className={`nav-btn nav-btn--next chapter-nav-btn--${next.kind}`}
            onClick={() => onGoToChapter(next.id)}
          >
            <span className="nav-title">{next.title}</span>
            <span className="nav-label">Next</span>
            <span className="nav-arrow">›</span>
          </button>
        ) : null}
      </nav>

      <div className="spacer" />
    </div>
  )
}
