import { useAuth } from '../../context/AuthContext'
import { useEvents } from '../../context/EventsContext'
import TaskForm from './TaskForm'
import TaskItem from './TaskItem'
import styles from './TaskList.module.css'

export default function TaskList({ eventId }) {
  const { users } = useAuth()
  const { getEvent, addTask, updateTask, deleteTask } = useEvents()
  const event = getEvent(eventId)
  const tasks = event ? event.tasks : []

  return (
    <section data-event-id={eventId}>
      <h2>Tasks</h2>

      <TaskForm
        users={users}
        onAdd={(task) => addTask(eventId, task)}
      />

      {tasks.length === 0 ? (
        <p className="text-muted">No tasks yet. Add the first one above.</p>
      ) : (
        <ul className={styles.list}>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              users={users}
              onToggle={() => updateTask(eventId, task.id, { done: !task.done })}
              onDelete={() => deleteTask(eventId, task.id)}
            />
          ))}
        </ul>
      )}
    </section>
  )
}
