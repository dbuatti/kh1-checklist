import type { Chapter } from '../data/guide'

interface ChapterListProps {
  stages: Chapter[]
  done: Record<string, boolean>
  onSelectChapter: (id: string) => void
}

export function ChapterList({
  stages,
  done,
  onSelectChapter,
}: ChapterListProps) {
  return (
    <main className="app-main">
      {stages.map((chapter) => {
        const total = chapter.tasks.length
        const completed = chapter.tasks.filter((t) => done[t.id]).length
        const pct = total ? Math.round((completed / total) * 100) : 0
        const kind = chapter.kind

        return (
          <article
            key={chapter.id}
            className={`chapter-card chapter-card--${kind}`}
            onClick={() => onSelectChapter(chapter.id)}
          >
            <div className="card-header">
              <span className={`card-kind ${kind}`}>
                {kind === 'story' ? 'Story' : 'Side Quest'}
              </span>
              <span className={`card-pct chapter-pct--${kind}`}>{pct}%</span>
            </div>
            <h2 className={`card-title chapter-title--${kind}`}>
              {chapter.title}
            </h2>
            {chapter.subtitle ? (
              <p className={`card-sub chapter-sub--${kind}`}>
                {chapter.subtitle}
              </p>
            ) : null}
            <div className="card-progress">
              <div className="card-bar">
                <div
                  className={`card-fill chapter-fill--${kind}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="card-count">
                {completed} / {total}
              </span>
            </div>
          </article>
        )
      })}
      <div className="spacer" />
    </main>
  )
}
