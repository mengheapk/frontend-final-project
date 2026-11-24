import { Link } from 'react-router-dom';
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import DayCell from './DayCell';
import styles from './MonthGrid.module.css';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// month: a Date in the month to show; eventsByDate: { 'YYYY-MM-DD': Event[] } sorted by start time
export default function MonthGrid({ month, eventsByDate }) {
  // Pad to full weeks so the first day lines up with the right weekday column.
  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(month)),
    end: endOfWeek(endOfMonth(month)),
  });

  const monthDays = days.filter((day) => isSameMonth(day, month));
  const daysWithEvents = monthDays.filter(
    (day) => (eventsByDate[format(day, 'yyyy-MM-dd')] || []).length > 0
  );

  return (
    <>
      <div className={styles.grid} role="grid" aria-label={format(month, 'MMMM yyyy')}>
        {WEEKDAYS.map((name) => (
          <div key={name} className={styles.weekday} role="columnheader">
            {name}
          </div>
        ))}
        {days.map((day) => {
          const key = format(day, 'yyyy-MM-dd');
          return (
            <DayCell
              key={key}
              day={day}
              inMonth={isSameMonth(day, month)}
              today={isToday(day)}
              events={eventsByDate[key] || []}
            />
          );
        })}
      </div>

      {/* Shown instead of the grid on narrow screens */}
      <div className={styles.list}>
        {daysWithEvents.length === 0 ? (
          <p className="text-muted">No events this month.</p>
        ) : (
          daysWithEvents.map((day) => {
            const key = format(day, 'yyyy-MM-dd');
            return (
              <section key={key} className="card">
                <h3 className={styles.listDay}>{format(day, 'EEEE, MMM d')}</h3>
                <ul className={styles.listEvents}>
                  {eventsByDate[key].map((event) => (
                    <li key={event.id}>
                      <Link to={`/events/${event.id}`}>
                        {event.startTime} {event.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })
        )}
      </div>
    </>
  );
}