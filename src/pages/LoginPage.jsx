import { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { seedUsers } from '../utils/seed'
import styles from './LoginPage.module.css'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(name, email) {
  const errors = {}
  if (!name.trim()) errors.name = 'Name is required'
  if (!email.trim()) errors.email = 'Email is required'
  else if (!EMAIL_PATTERN.test(email.trim())) errors.email = 'Enter a valid email address'
  return errors
}

export default function LoginPage() {
  useDocumentTitle('Log in')
  const { currentUser, login } = useAuth()
  const location = useLocation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})

  // Once logged in, go back to the page that sent us here (or the dashboard).
  if (currentUser) return <Navigate to={location.state?.from ?? '/'} replace />

  function handleSubmit(e) {
    e.preventDefault()
    const found = validate(name, email)
    setErrors(found)
    if (Object.keys(found).length > 0) return
    login(name, email)
  }

  return (
    <section className={styles.page}>
      <div className={`card ${styles.panel}`}>
        <h1>Welcome</h1>
        <p className={`text-muted ${styles.intro}`}>
          Log in with your name and email. New emails create an account automatically.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'name-error' : undefined}
              autoComplete="name"
            />
            {errors.name && <p id="name-error" className="field-error">{errors.name}</p>}
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
              autoComplete="email"
            />
            {errors.email && <p id="email-error" className="field-error">{errors.email}</p>}
          </div>

          <button type="submit" className={`btn btn-primary ${styles.submit}`}>
            Log in
          </button>
        </form>

        <div className={styles.demo}>
          <p className="text-muted">Or try a demo account:</p>
          <div className={styles.demoButtons}>
            {seedUsers.map((user) => (
              <button
                key={user.id}
                type="button"
                className="btn btn-sm"
                onClick={() => login(user.name, user.email)}
              >
                {user.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}