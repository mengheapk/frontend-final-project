import { useState } from 'react'
import styles from './TaskForm.module.css'

export default function TaskForm({ users, onAdd }) {
  const [title, setTitle] = useState('')
  const [assigneeId, setAssigneeId] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const cleanTitle = title.trim()
    if (!cleanTitle) {
      setError('Task title is required')
      return
    }
    if (cleanTitle.length > 100) {
      setError('Task title must be 100 characters or fewer')
      return
    }
    onAdd({ title: cleanTitle, assigneeId: assigneeId || null, dueDate })
    setTitle('')
    setAssigneeId('')
    setDueDate('')
    setError('')
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="task-title">Task</label>
        <input
          id="task-title"
          className="input"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
            setError('')
          }}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'task-title-error' : undefined}
        />
        {error && <p id="task-title-error" className="field-error">{error}</p>}
      </div>

      <div className="field">
        <label htmlFor="task-assignee">Assign to</label>
        <select
          id="task-assignee"
          className="input"
          value={assigneeId}
          onChange={(e) => setAssigneeId(e.target.value)}
        >
          <option value="">Unassigned</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="task-due">Due date (optional)</label>
        <input
          id="task-due"
          type="date"
          className="input"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <div className={styles.submit}>
        <button type="submit" className="btn btn-primary">Add task</button>
      </div>
    </form>
  )
}