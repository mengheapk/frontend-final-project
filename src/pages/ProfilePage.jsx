import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import useDocumentTitle from '../hooks/useDocumentTitle'
import styles from './ProfilePage.module.css'

export default function ProfilePage() {
  useDocumentTitle('Profile')
  const { currentUser, updateProfile, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [name, setName] = useState(currentUser.name)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)

  // Hide the "Saved" message after 2 seconds.
  useEffect(() => {
    if (!saved) return
    const timer = setTimeout(() => setSaved(false), 2000)
    return () => clearTimeout(timer)
  }, [saved])

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) {
      setError('Name is required')
      return
    }
    updateProfile({ name: trimmed })
    setName(trimmed)
    setSaved(true)
  }

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <section className={styles.page}>
      <h1>Profile</h1>

      <div className={`card ${styles.section}`}>
        <h2>Your details</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="profile-name">Name</label>
            <input
              id="profile-name"
              className="input"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                setError('')
              }}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'profile-name-error' : undefined}
            />
            {error && <p id="profile-name-error" className="field-error">{error}</p>}
          </div>

          <div className="field">
            <label htmlFor="profile-email">Email</label>
            <input
              id="profile-email"
              className="input"
              value={currentUser.email}
              readOnly
              aria-describedby="profile-email-hint"
            />
            <p id="profile-email-hint" className={`text-muted ${styles.hint}`}>
              Your email is how you log in, so it can't be changed.
            </p>
          </div>

          <div className={styles.actions}>
            <button type="submit" className="btn btn-primary" disabled={name.trim() === currentUser.name}>
              Save
            </button>
            {saved && <span className={styles.saved} role="status">Saved</span>}
          </div>
        </form>
      </div>

      <div className={`card ${styles.section}`}>
        <h2>Appearance</h2>
        <div className={styles.row}>
          <div>
            <p className={styles.label}>Theme</p>
            <p className="text-muted">Currently {theme === 'light' ? 'light' : 'dark'} mode</p>
          </div>
          <button type="button" className="btn" onClick={toggleTheme}>
            Switch to {theme === 'light' ? 'dark' : 'light'} mode
          </button>
        </div>
      </div>

      <div className={`card ${styles.section}`}>
        <div className={styles.row}>
          <div>
            <p className={styles.label}>Log out</p>
            <p className="text-muted">You can log back in with the same email.</p>
          </div>
          <button type="button" className="btn btn-danger" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>
    </section>
  )
}