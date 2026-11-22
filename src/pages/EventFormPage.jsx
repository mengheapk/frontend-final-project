import { Link, useNavigate, useParams } from 'react-router-dom';
import EventForm from '../components/events/EventForm';
import { useAuth } from '../context/AuthContext';
import { useEvents } from '../context/EventsContext';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function EventFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { getEvent, addEvent, updateEvent } = useEvents();

  const isEdit = Boolean(id);
  useDocumentTitle(isEdit ? 'Edit event' : 'New event');

  const event = isEdit ? getEvent(id) : undefined;

  if (isEdit && !event) {
    return (
      <div className="card" style={{ margin: '24px auto', maxWidth: 640, padding: 24 }}>
        <h1>Event not found</h1>
        <p className="text-muted">This event doesn't exist or was deleted.</p>
        <Link to="/events" className="btn">Back to events</Link>
      </div>
    );
  }

  if (isEdit && event.ownerId !== currentUser.id) {
    return (
      <div className="card" style={{ margin: '24px auto', maxWidth: 640, padding: 24 }}>
        <h1>Not allowed</h1>
        <p className="text-muted">You can only edit your own events.</p>
        <Link to={`/events/${id}`} className="btn">Back to event</Link>
      </div>
    );
  }

  const initialValues = isEdit
    ? {
        title: event.title,
        description: event.description ?? '',
        location: event.location,
        category: event.category,
        date: event.date,
        startTime: event.startTime,
        endTime: event.endTime,
      }
    : undefined;

  function handleSubmit(values) {
    if (isEdit) {
      updateEvent(id, values);
      navigate(`/events/${id}`);
    } else {
      const newId = addEvent(values);
      navigate(`/events/${newId}`);
    }
  }

  function handleCancel() {
    navigate(isEdit ? `/events/${id}` : '/events');
  }

  return (
    <EventForm
      heading={isEdit ? 'Edit event' : 'New event'}
      submitLabel={isEdit ? 'Save changes' : 'Create event'}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
}
