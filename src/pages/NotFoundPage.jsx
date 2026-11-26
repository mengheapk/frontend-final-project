import { Link } from 'react-router-dom'
import useDocumentTitle from '../hooks/useDocumentTitle'
import styles from './NotFoundPage.module.css'

export default function NotFoundPage() {
  useDocumentTitle('Page not found')
  return (
    <section className={styles.page}>
      <div className={`card ${styles.panel}`}>
        <p className={styles.code}>404</p>
        <h1>Page not found</h1>
        <p className="text-muted">
          The page you are looking for doesn&apos;t exist or may have been moved.
        </p>
        <div className={styles.actions}>
          <Link to="/" className="btn btn-primary">
            Go to dashboard
          </Link>
          <Link to="/events" className="btn">
            Browse events
          </Link>
        </div>
      </div>
    </section>
  )
}