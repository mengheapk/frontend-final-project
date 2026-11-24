import { Link } from 'react-router-dom'
import { differenceInCalendarDays, format, isBefore, parseISO, startOfToday } from 'date-fns'
import EventCard from '../components/events/EventCard'
import { useAuth } from '../context/AuthContext'
import { useEvents } from '../context/EventsContext'
import useDocumentTitle from '../hooks/useDocumentTitle'
import styles from './DashboardPage.module.css'

const STATUS_LABELS = { going: 'Going', maybe: 'Maybe', declined: "Can't go" }

function byDateThenTime(a, b) {
  if (a.date !== b.date) return a.date.localeCompare(b.date)
  return a.startTime.localeCompare(b.startTime)
}

function formatDate(date) {
  return format(parseISO(date), 'EEE, d MMM yyyy')
}

export default function DashboardPage() {
  useDocumentTitle('Dashboard')
  const { currentUser } = useAuth()
  const { events, updateTask } = useEvents()

  const today = startOfToday()
  const daysOverdue = (date) => differenceInCalendarDays(today, parseISO(date))
  const isUpcoming = (event) => !isBefore(parseISO(event.date), today)

  const upcoming = events.filter(isUpcoming).sort(byDateThenTime)
  const nextEvents = upcoming.slice(0, 5)

  const myRsvps = upcoming
    .map((event) => ({ event, rsvp: event.rsvps.find((r) => r.userId === currentUser.id) }))
    .filter((item) => item.rsvp)

  const myTasks = events
    .flatMap((event) =>
      event.tasks
        .filter((task) => task.assigneeId === currentUser.id && !task.done)
        .map((task) => ({ task, event })),
    )
    .sort((a, b) => {
      // Tasks with a due date first (soonest first), then tasks without one.
      if (!a.task.dueDate) return 1
      if (!b.task.dueDate) return -1
      return a.task.dueDate.localeCompare(b.task.dueDate)
    })

  const firstName = currentUser.name.split(' ')[0]

  return (
    <section>
      <div className={styles.header}>
        <div>
          <h1>Hi, {firstName}</h1>
          <p className="text-muted">
            {upcoming.length} upcoming {upcoming.length === 1 ? 'event' : 'events'} ·{' '}
            {myTasks.length} open {myTasks.length === 1 ? 'task' : 'tasks'} for you
          </p>
        </div>
        <Link to="/events/new" className="btn btn-primary">
          New event
        </Link>
      </div>

      <div className={styles.sectionHeader}>
        <h2>Upcoming events</h2>
        <Link to="/events">View all</Link>
      </div>
      {nextEvents.length === 0 ? (
        <p className="text-muted">
          No upcoming events. <Link to="/events/new">Create one</Link>.
        </p>
      ) : (
        <div className={styles.eventGrid}>
          {nextEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}

      <div className={styles.columns}>
        <div className={`card ${styles.panel}`}>
          <h2>Your RSVPs</h2>
          {myRsvps.length === 0 ? (
            <p className="text-muted">You haven&apos;t answered any upcoming invitations yet.</p>
          ) : (
            <ul className={styles.list}>
              {myRsvps.map(({ event, rsvp }) => (
                <li key={event.id} className={styles.item}>
                  <div>
                    <Link to={`/events/${event.id}`} className={styles.itemTitle}>
                      {event.title}
                    </Link>
                    <p className="text-muted">
                      {formatDate(event.date)} · {event.startTime}
                    </p>
                  </div>
                  <span className={`${styles.badge} ${styles[rsvp.status]}`}>
                    {STATUS_LABELS[rsvp.status]}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={`card ${styles.panel}`}>
          <h2>Your open tasks</h2>
          {myTasks.length === 0 ? (
            <p className="text-muted">No open tasks assigned to you.</p>
          ) : (
            <ul className={styles.list}>
              {myTasks.map(({ task, event }) => {
                const overdue = task.dueDate && isBefore(parseISO(task.dueDate), today)
                return (
                  <li key={task.id} className={styles.item}>
                    <div>
                      <p className={styles.itemTitle}>{task.title}</p>
                      <p className="text-muted">
                        <Link to={`/events/${event.id}`}>{event.title}</Link>
                      </p>
                      {task.dueDate && (
                        <p className={overdue ? styles.overdue : 'text-muted'}>
                          {overdue
                            ? `Overdue by ${daysOverdue(task.dueDate)} ${daysOverdue(task.dueDate) === 1 ? 'day' : 'days'}`
                            : `Due ${formatDate(task.dueDate)}`}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      className="btn btn-sm"
                      onClick={() => updateTask(event.id, task.id, { done: true })}
                    >
                      Mark done
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}