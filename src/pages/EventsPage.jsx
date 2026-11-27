import { useState } from 'react';
import { Link } from 'react-router-dom';
import { isBefore, parseISO, startOfToday } from 'date-fns';
import EventCard from '../components/events/EventCard';
import EventFilters from '../components/events/EventFilters';
import { useEvents } from '../context/EventsContext';
import useDocumentTitle from '../hooks/useDocumentTitle';
import styles from './EventsPage.module.css';

export default function EventsPage() {
  useDocumentTitle('Events');
  const { events } = useEvents();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [timeFilter, setTimeFilter] = useState('upcoming');

  const today = startOfToday();
  const query = search.trim().toLowerCase();

  const visibleEvents = events
    .filter((event) => event.title.toLowerCase().includes(query))
    .filter((event) => category === 'All' || event.category === category)
    .filter((event) => {
      if (timeFilter === 'all') return true;
      const isPast = isBefore(parseISO(event.date), today);
      return timeFilter === 'past' ? isPast : !isPast;
    })
    .sort((a, b) => {
      if (a.date !== b.date) return a.date.localeCompare(b.date);
      return a.startTime.localeCompare(b.startTime);
    });

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <h1>Events</h1>
        <Link to="/events/new" className="btn btn-primary">
          New event
        </Link>
      </div>

      <EventFilters
        search={search}
        category={category}
        timeFilter={timeFilter}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
        onTimeFilterChange={setTimeFilter}
      />

      {visibleEvents.length === 0 ? (
        <p className="text-muted">No events match your filters.</p>
      ) : (
        <div className={styles.list}>
          {visibleEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </section>
  );
}
