interface ChecklistItemProps {
  id: string
  text: string
  note?: string
  checked: boolean
  onToggle: (id: string) => void
}

export function ChecklistItem({
  id,
  text,
  note,
  checked,
  onToggle,
}: ChecklistItemProps) {
  return (
    <label className="checklist-item">
      <input
        type="checkbox"
        className="checkbox"
        checked={checked}
        onChange={() => onToggle(id)}
      />
      <span className="checkmark"></span>
      <div className="label-wrapper">
        <span className={checked ? 'label done' : 'label'}>{text}</span>
        {note && (
          <span className={`note ${checked ? 'done' : ''}`}>{note}</span>
        )}
      </div>
    </label>
  )
}
