import { useState, useMemo, useCallback } from 'react'
import { STAGES, CREDIT_URL } from './data/guide'
import { ChapterList } from './components/ChapterList'
import { ChapterView } from './components/ChapterView'
import './App.css'
const STORAGE_KEY = 'kh1-checklist-v1'

type DoneMap = Record<string, boolean>

function loadDone(): DoneMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as DoneMap
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

function saveDone(done: DoneMap) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(done))
  } catch {
    // Storage unavailable; progress won't persist across reloads.
  }
}

export default function App() {
  const [done, setDone] = useState<DoneMap>(loadDone)
  const [view, setView] = useState<'list' | 'chapter'>('list')
  const [activeChapterId, setActiveChapterId] = useState<string | null>(null)

  const onToggle = useCallback((id: string) => {
    setDone((prev) => {
      const next = { ...prev, [id]: !prev[id] }
      saveDone(next)
      return next
    })
  }, [])

  const onReset = useCallback(() => {
    if (!confirm('Reset all progress? This cannot be undone.')) return
    const next: DoneMap = {}
    setDone(next)
    saveDone(next)
  }, [])

  const total = useMemo(
    () => STAGES.reduce((sum, c) => sum + c.tasks.length, 0),
    []
  )

  const completed = useMemo(
    () => Object.keys(done).filter((id) => done[id]).length,
    [done]
  )

  const activeChapter = useMemo(
    () => STAGES.find((c) => c.id === activeChapterId),
    [activeChapterId]
  )

  const activeIndex = useMemo(
    () => STAGES.findIndex((c) => c.id === activeChapterId),
    [activeChapterId]
  )

  const prevChapter = activeIndex > 0 ? STAGES[activeIndex - 1] : null
  const nextChapter =
    activeIndex >= 0 && activeIndex < STAGES.length - 1
      ? STAGES[activeIndex + 1]
      : null

  const onGoToChapter = useCallback(
    (id: string) => {
      setActiveChapterId(id)
      setView('chapter')
    },
    []
  )

  const onBack = useCallback(() => {
    setView('list')
    setActiveChapterId(null)
  }, [])

  if (view === 'chapter' && activeChapter) {
    return (
      <div className="app app--chapter">
        <ChapterView
          chapter={activeChapter}
          prev={prevChapter}
          next={nextChapter}
          done={done}
          onToggle={onToggle}
          onGoToChapter={onGoToChapter}
          onBack={onBack}
        />
      </div>
    )
  }

  return (
    <div className="app app--list">
      <ProgressHeaderInline total={total} completed={completed} onReset={onReset} />
      <ChapterList
        stages={STAGES}
        done={done}
        onSelectChapter={onGoToChapter}
      />
    </div>
  )
}

function ProgressHeaderInline({
  total,
  completed,
  onReset,
}: {
  total: number
  completed: number
  onReset: () => void
}) {
  const pct = total ? Math.round((completed / total) * 100) : 0

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="brand">
          <span className="brand-mark">KH1</span>
          <span className="brand-name">100% Checklist</span>
        </div>
        <div className="progress">
          <div className="progress-top">
            <span className="progress-pct">{pct}%</span>
            <span className="progress-count">
              {completed} / {total} tasks
            </span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
        <button className="reset-btn" onClick={onReset}>
          Reset progress
        </button>
      </div>
      <p className="credit">
        Guide structure credited to{' '}
        <a
          href={CREDIT_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          cR0Ck's KH1 HD 100% Story walkthrough
        </a>
      </p>
    </header>
  )
}
