import { useState } from 'react';
import styles from './EventForm.module.css';

const CATEGORIES = ['Social', 'Work', 'Study', 'Sports', 'Other'];

const EMPTY_VALUES = {
  title: '',
  description: '',
  location: '',
  category: 'Social',
  date: '',
  startTime: '',
  endTime: '',
};

function validate(values) {
  const errors = {};

  const title = values.title.trim();
  if (!title) errors.title = 'Title is required';
  else if (title.length > 100) errors.title = 'Title must be 100 characters or fewer';

  if (!values.location.trim()) errors.location = 'Location is required';

  if (!values.date) errors.date = 'Date is required';

  if (!values.startTime) errors.startTime = 'Start time is required';

  if (!values.endTime) errors.endTime = 'End time is required';
  else if (values.startTime && values.endTime <= values.startTime) {
    errors.endTime = 'End time must be after start time';
  }

  if (!CATEGORIES.includes(values.category)) errors.category = 'Choose a category';

  if (values.description.length > 500) {
    errors.description = 'Description must be 500 characters or fewer';
  }

  return errors;
}

export default function EventForm({
  initialValues,
  onSubmit,
  onCancel,
  heading,
  submitLabel = 'Save',
}) {
  const [values, setValues] = useState(() => ({ ...EMPTY_VALUES, ...initialValues }));
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    onSubmit({
      ...values,
      title: values.title.trim(),
      location: values.location.trim(),
      description: values.description.trim(),
    });
  }

  return (
    <section className={styles.wrapper}>
      <h1>{heading}</h1>

      <form className={`card ${styles.form}`} onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            className="input"
            value={values.title}
            onChange={handleChange}
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? 'title-error' : undefined}
          />
          {errors.title && (
            <p id="title-error" className="field-error">{errors.title}</p>
          )}
        </div>

        <div className="field">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            name="location"
            className="input"
            value={values.location}
            onChange={handleChange}
            aria-invalid={Boolean(errors.location)}
            aria-describedby={errors.location ? 'location-error' : undefined}
          />
          {errors.location && (
            <p id="location-error" className="field-error">{errors.location}</p>
          )}
        </div>

        <div className="field">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            className="input"
            value={values.category}
            onChange={handleChange}
            aria-invalid={Boolean(errors.category)}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.category && <p className="field-error">{errors.category}</p>}
        </div>

        <div className={styles.row}>
          <div className="field">
            <label htmlFor="date">Date</label>
            <input
              id="date"
              name="date"
              type="date"
              className="input"
              value={values.date}
              onChange={handleChange}
              aria-invalid={Boolean(errors.date)}
              aria-describedby={errors.date ? 'date-error' : undefined}
            />
            {errors.date && (
              <p id="date-error" className="field-error">{errors.date}</p>
            )}
          </div>

          <div className="field">
            <label htmlFor="startTime">Start time</label>
            <input
              id="startTime"
              name="startTime"
              type="time"
              className="input"
              value={values.startTime}
              onChange={handleChange}
              aria-invalid={Boolean(errors.startTime)}
              aria-describedby={errors.startTime ? 'startTime-error' : undefined}
            />
            {errors.startTime && (
              <p id="startTime-error" className="field-error">{errors.startTime}</p>
            )}
          </div>

          <div className="field">
            <label htmlFor="endTime">End time</label>
            <input
              id="endTime"
              name="endTime"
              type="time"
              className="input"
              value={values.endTime}
              onChange={handleChange}
              aria-invalid={Boolean(errors.endTime)}
              aria-describedby={errors.endTime ? 'endTime-error' : undefined}
            />
            {errors.endTime && (
              <p id="endTime-error" className="field-error">{errors.endTime}</p>
            )}
          </div>
        </div>

        <div className="field">
          <label htmlFor="description">Description (optional)</label>
          <textarea
            id="description"
            name="description"
            className="input"
            rows={4}
            value={values.description}
            onChange={handleChange}
            aria-invalid={Boolean(errors.description)}
            aria-describedby={errors.description ? 'description-error' : undefined}
          />
          <p className={`text-muted ${styles.counter}`}>
            {values.description.length}/500
          </p>
          {errors.description && (
            <p id="description-error" className="field-error">{errors.description}</p>
          )}
        </div>

        <div className={styles.actions}>
          <button type="button" className="btn btn-ghost" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {submitLabel}
          </button>
        </div>
      </form>
    </section>
  );
}