import { format, parseISO } from 'date-fns'
import styles from './TaskItem.module.css'

export default function TaskItem({ task, users, onToggle, onDelete }) {
  const assignee = users.find((user) => user.id === task.assigneeId)
  const dueLabel = task.dueDate
    ? format(parseISO(task.dueDate), 'd MMM yyyy')
    : ''

  function handleDelete() {
    if (window.confirm(`Delete task "${task.title}"?`)) {
      onDelete()
    }
  }

  return (
    <li className={`card ${styles.item}`}>
      <input
        type="checkbox"
        checked={task.done}
        onChange={onToggle}
        aria-label={`Mark "${task.title}" as done`}
      />

      <div className={styles.body}>
        <span className={task.done ? styles.done : ''}>{task.title}</span>
        <span className="text-muted">
          {assignee ? assignee.name : 'Unassigned'}
          {dueLabel && ` · Due ${dueLabel}`}
        </span>
      </div>

      <button
        type="button"
        className="btn btn-danger btn-sm"
        onClick={handleDelete}
      >
        Delete
      </button>
    </li>
  )
}