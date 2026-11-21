import { Link, useNavigate, useParams } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import { useAuth } from '../context/AuthContext'
import { useEvents } from '../context/EventsContext'
import useDocumentTitle from '../hooks/useDocumentTitle'
import ShareButton from '../components/share/ShareButton'
import GuestList from '../components/rsvp/GuestList'
import TaskList from '../components/tasks/TaskList'
import styles from './EventDetailPage.module.css'

export default function EventDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const { getEvent, deleteEvent } = useEvents()
  const event = getEvent(id)
  useDocumentTitle(event ? event.title : 'Event not found')

  if (!event) {
    return (
      <section className={styles.page}>
        <div className="card">
          <h1>Event not found</h1>
          <p className="text-muted">This event doesn't exist or was deleted.</p>
          <Link to="/events" className="btn">Back to events</Link>
        </div>
      </section>
    )
  }

  const isOwner = currentUser && currentUser.id === event.ownerId
  const dateLabel = format(parseISO(event.date), 'EEEE, d MMMM yyyy')

  function handleDelete() {
    const confirmed = window.confirm(
      `Delete "${event.title}"? This cannot be undone.`
    )
    if (!confirmed) return
    deleteEvent(event.id)
    navigate('/events')
  }

  return (
    <section className={styles.page}>
      <Link to="/events" className={styles.back}>← Back to events</Link>

      <div className={`card ${styles.details}`}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>{event.title}</h1>
            <span className={styles.badge}>{event.category}</span>
          </div>

          <div className={styles.actions}>
            <ShareButton event={event} />
            {isOwner && (
              <>
                <Link to={`/events/${event.id}/edit`} className="btn">
                  Edit
                </Link>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>

        <dl className={styles.info}>
          <dt>Date</dt>
          <dd>{dateLabel}</dd>
          <dt>Time</dt>
          <dd>{event.startTime} – {event.endTime}</dd>
          <dt>Location</dt>
          <dd>{event.location}</dd>
          <dt>Description</dt>
          <dd>
            {event.description
              ? event.description
              : <span className="text-muted">No description.</span>}
          </dd>
        </dl>
      </div>

      <div className={`card ${styles.section}`}>
        <GuestList eventId={event.id} />
      </div>

      <div className={`card ${styles.section}`}>
        <TaskList eventId={event.id} />
      </div>
    </section>
  )
}
