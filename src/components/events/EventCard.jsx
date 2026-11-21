import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import styles from './EventCard.module.css';

export default function EventCard({ event }) {
  const dateLabel = format(parseISO(event.date), 'EEE, d MMM yyyy');

  return (
    <Link to={`/events/${event.id}`} className={`card ${styles.card}`}>
      <div className={styles.top}>
        <h2 className={styles.title}>{event.title}</h2>
        <span className={styles.badge}>{event.category}</span>
      </div>
      <p className="text-muted">
        {dateLabel} · {event.startTime} – {event.endTime}
      </p>
      <p className="text-muted">{event.location}</p>
    </Link>
  );
}
