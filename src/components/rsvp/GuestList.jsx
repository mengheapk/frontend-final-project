import { useEvents } from "../../context/EventsContext"
import styles from './GuestList.module.css';
function GuestGroup({ title, guests }) {
  return (
    <div>
      <h3 className={styles.groupTitle}>
        {title} ({guests.length})
      </h3>

      {guests.length === 0 ? (
        <p className="text-muted">Nobody yet.</p>
      ) : (
        <ul className={styles.names}>
          {guests.map((guest) => (
            <li key={guest.userId || guest.name}>{guest.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function GuestList({ eventId }) {
  const { getEvent } = useEvents();
  const event = getEvent(eventId);
  if (!event) return null;

  const going = event.rsvps.filter((rsvp) => rsvp.status === 'going');
  const maybe = event.rsvps.filter((rsvp) => rsvp.status === 'maybe');
  const declined = event.rsvps.filter((rsvp) => rsvp.status === 'declined');

  return (
  <section className="card">
    <h2 className={styles.title}>Guest list</h2>
    {event.rsvps.length === 0 ? (
      <p className="text-muted">No answers yet. Share the link to invite people.</p>
      ) : (
      <div className={styles.groups}>
        <GuestGroup title="Going" guests={going} />
        <GuestGroup title="Maybe" guests={maybe} />
        <GuestGroup title="Can't go" guests={declined} />
      </div>
      )}
  </section>
  );
}