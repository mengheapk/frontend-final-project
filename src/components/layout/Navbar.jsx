import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import styles from './Navbar.module.css'

const links = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/events', label: 'Events', end: false },
  { to: '/calendar', label: 'Calendar', end: false },
  { to: '/profile', label: 'Profile', end: false },
]

export default function Navbar() {
  const { currentUser, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.brand}>
          Event Planning Portal
        </Link>

        {currentUser && (
          <ul className={styles.links}>
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        )}

        <div className={styles.actions}>
          <button type="button" className={styles.button} onClick={toggleTheme}>
            {theme === 'light' ? 'Dark mode' : 'Light mode'}
          </button>
          {currentUser ? (
            <>
              <span className={styles.user}>{currentUser.name}</span>
              <button type="button" className={styles.button} onClick={handleLogout}>
                Log out
              </button>
            </>
          ) : (
            <Link to="/login" className={styles.button}>
              Log in
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}