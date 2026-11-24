import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import styles from './DayCell.module.css';

const MAX_VISIBLE = 2;

export default function DayCell({ day, inMonth, today, events }) {
  const visible = events.slice(0, MAX_VISIBLE);
  const hidden = events.length - visible.length;

  const classNames = [
    styles.cell,
    inMonth ? '' : styles.outside,
    today ? styles.today : '',
  ].join(' ');

  return (
    <div className={classNames} role="gridcell" aria-current={today ? 'date' : undefined}>
      <span className={styles.number}>{format(day, 'd')}</span>
      <ul className={styles.events}>
        {visible.map((event) => (
          <li key={event.id}>
            <Link to={`/events/${event.id}`} className={styles.event} title={event.title}>
              <span className={styles.time}>{event.startTime}</span> {event.title}
            </Link>
          </li>
        ))}
      </ul>
      {hidden > 0 && <span className={`${styles.more} text-muted`}>+{hidden} more</span>}
    </div>
  );
}