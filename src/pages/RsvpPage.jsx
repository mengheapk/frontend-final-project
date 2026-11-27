import { useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { useEvents } from '../context/EventsContext';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { decodeEvent } from '../utils/share';
import RsvpButtons from '../components/rsvp/RsvpButtons'
import styles from './RsvpPage.module.css';

export default function RsvpPage() {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const { getEvent, importEvent } = useEvents();

    const savedEvent = getEvent(id);
    const code = searchParams.get('e');
    const linkEvent = code ? decodeEvent(code) : null;

    let event = null;
    if (savedEvent) {
        event = savedEvent;
    } else if (linkEvent && linkEvent.id === id) {
        event = linkEvent;
    }

    useDocumentTitle(event ? event.title : 'Event not found');
    useEffect(() => {
        if (!savedEvent && event) {
            importEvent(event);
        }
    }, [savedEvent, event, importEvent]);

    if (!event) {
        return (
            <section className={styles.page}>
            <div className="card">
                <h1>We could not open this event</h1>
                <p className="text-muted">The link looks broken or incomplete. Ask the host to send it again.</p>
                <Link to="/" className="btn btn-primary">
                Go to home
                </Link>
            </div>
            </section>
        );
    }
    return (
        <section className={styles.page}>
            <div className="card">
            <h1>{event.title}</h1>
            <p className="text-muted">
                {format(parseISO(event.date), 'EEEE, d MMMM yyyy')} · {event.startTime} – {event.endTime}
            </p>
            <p>{event.location}</p>
            <p className="text-muted">{event.category}</p>
                {event.description && <p>{event.description}
            </p>}
            </div>
            <div className="card">
            <h2>Will you come?</h2>
            <RsvpButtons eventId={event.id} />
            </div>
        </section>
        );
}