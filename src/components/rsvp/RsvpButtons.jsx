import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useEvents } from '../../context/EventsContext';
import styles from './RsvpButtons.module.css';

export default function RsvpButtons({ eventId }) {
  const { currentUser } = useAuth();
  const { getEvent, importEvent, setRsvp } = useEvents();

  const [guestName, setGuestName] = useState('');
  const [nameError, setNameError] = useState('');
  const [saved, setSaved] = useState(false);

  const event = getEvent(eventId);
  function findMyAnswer() {
    if (!event) return null;
    if (currentUser) {
      return event.rsvps.find((rsvp) => rsvp.userId === currentUser.id) || null;
    }
    const name = guestName.trim().toLowerCase();
    if (name === '') return null;
    return event.rsvps.find((rsvp) => !rsvp.userId && rsvp.name.toLowerCase() === name) || null;
  }
  const myAnswer = findMyAnswer();
  const myStatus = myAnswer ? myAnswer.status : '';

  function handleNameChange(e) {
    setGuestName(e.target.value);
    setNameError('');
    setSaved(false);
  }

  function handleAnswer(status) {
    if (!currentUser && guestName.trim() === '') {
      setNameError('Please enter your name first.');
      return;
    }
    setNameError('');
    if (event) {
      importEvent(event);
    }
    setRsvp(eventId, status, guestName);
    setSaved(true);
  }

  function buttonClass(status) {
    return myStatus === status ? 'btn btn-primary' : 'btn';
  }
  return (
  <div className={styles.wrapper}>
    {!currentUser && (
      <div className="field">
        <label htmlFor="guest-name">Your name</label>
        <input
          id="guest-name"
          className="input"
          value={guestName}
          onChange={handleNameChange}
          aria-invalid={Boolean(nameError)}
        /> {nameError && <p className="field-error">{nameError}</p>}
      </div>
      )}
      <div className={styles.buttons}>
        <button type="button" className={buttonClass('going')} onClick={() => handleAnswer('going')}>Going</button>
        <button type="button" className={buttonClass('maybe')} onClick={() => handleAnswer('maybe')}>Maybe</button>
        <button type="button" className={buttonClass('declined')} onClick={() => handleAnswer('declined')}>Can't go</button>
      </div>
      {saved && <p className="text-muted">Your answer is saved on this device.</p>}
  </div>
  );
}