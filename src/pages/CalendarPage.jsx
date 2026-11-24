import { useMemo, useState } from 'react';
import { addMonths, format, startOfMonth, subMonths } from 'date-fns';
import { useEvents } from '../context/EventsContext';
import useDocumentTitle from '../hooks/useDocumentTitle';
import MonthGrid from '../components/calendar/MonthGrid';
import styles from './CalendarPage.module.css';

export default function CalendarPage() {
  useDocumentTitle('Calendar');
  const { events } = useEvents();
  const [month, setMonth] = useState(() => startOfMonth(new Date()));

  const eventsByDate = useMemo(() => {
    const map = {};
    events.forEach((event) => {
      if (!map[event.date]) map[event.date] = [];
      map[event.date].push(event);
    });
    Object.values(map).forEach((list) =>
      list.sort((a, b) => a.startTime.localeCompare(b.startTime))
    );
    return map;
  }, [events]);

  return (
    <main className={styles.page}>
      <div className={styles.toolbar}>
        <h1 className={styles.title}>{format(month, 'MMMM yyyy')}</h1>
        <div className={styles.buttons}>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => setMonth((m) => subMonths(m, 1))}
          >
            Prev
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => setMonth(startOfMonth(new Date()))}
          >
            Today
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => setMonth((m) => addMonths(m, 1))}
          >
            Next
          </button>
        </div>
      </div>
      <MonthGrid month={month} eventsByDate={eventsByDate} />
    </main>
  );
}