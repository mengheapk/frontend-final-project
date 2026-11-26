import { useEffect, useState } from 'react'
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
  const [menuOpen, setMenuOpen] = useState(false)

  // Close the mobile menu with the Escape key.
  useEffect(() => {
    if (!menuOpen) return
    function handleKey(e) {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [menuOpen])

  function closeMenu() {
    setMenuOpen(false)
  }

  function handleLogout() {
    closeMenu()
    logout()
    navigate('/login')
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Main">
        <Link to="/" className={styles.brand} onClick={closeMenu}>
          Event Planning Portal
        </Link>

        <button
          type="button"
          className={`${styles.button} ${styles.toggle}`}
          aria-expanded={menuOpen}
          aria-controls="main-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>

        <div id="main-menu" className={`${styles.menu} ${menuOpen ? styles.open : ''}`}>
          {currentUser && (
            <ul className={styles.links}>
              {links.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.end}
                    onClick={closeMenu}
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
              <Link to="/login" className={styles.button} onClick={closeMenu}>
                Log in
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}