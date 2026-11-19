import { useParams } from 'react-router-dom'
import { useEvents } from '../context/EventsContext'
import useDocumentTitle from '../hooks/useDocumentTitle'
import ShareButton from '../components/share/ShareButton'
import GuestList from '../components/rsvp/GuestList'
import TaskList from '../components/tasks/TaskList'

export default function EventDetailPage() {
  const { id } = useParams()
  const { getEvent } = useEvents()
  const event = getEvent(id)
  useDocumentTitle(event ? event.title : 'Event not found')

  if (!event) {
    return (
      <section>
        <h1>Event not found</h1>
      </section>
    )
  }

  return (
    <section>
      <h1>{event.title}</h1>
      <p>Full details coming in A3.</p>
      <ShareButton event={event} />
      <GuestList eventId={event.id} />
      <TaskList eventId={event.id} />
    </section>
  )
}