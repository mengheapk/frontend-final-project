import { useAuth } from '../../context/AuthContext';
import { useEvents } from '../../context/EventsContext';
import RsvpButtons from './RsvpButtons';
import styles from './GuestList.module.css';

function GuestGroup({ title, guests, displayName }) {
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
                <li key={guest.userId || guest.name}>{displayName(guest)}</li>
            ))}
          </ul>
        )}
      </div>
    );
}

export default function GuestList({ eventId }) {
    const { users } = useAuth();
    const { getEvent } = useEvents();
    const event = getEvent(eventId);
    if (!event) return null;

    // Show a user's current name (it may have changed on the profile page); guests keep the name they typed.
    const displayName = (rsvp) => users.find((user) => user.id === rsvp.userId)?.name ?? rsvp.name;

    const going = event.rsvps.filter((rsvp) => rsvp.status === 'going');
    const maybe = event.rsvps.filter((rsvp) => rsvp.status === 'maybe');
    const declined = event.rsvps.filter((rsvp) => rsvp.status === 'declined');

    return (
    <section>
        <h2 className={styles.title}>Guest list</h2>

        <div className={styles.answer}>
            <h3 className={styles.groupTitle}>Your answer</h3>
            <RsvpButtons eventId={eventId} />
        </div>

        {event.rsvps.length === 0 ? (
            <p className="text-muted">No answers yet. Share the link to invite people.</p>
            ) : (
            <div className={styles.groups}>
              <GuestGroup title="Going" guests={going} displayName={displayName} />
              <GuestGroup title="Maybe" guests={maybe} displayName={displayName} />
              <GuestGroup title="Can't go" guests={declined} displayName={displayName} />
            </div>
            )}
      </section>
      );
}