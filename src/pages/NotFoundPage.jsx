import { Link } from 'react-router-dom'
import useDocumentTitle from '../hooks/useDocumentTitle'

export default function NotFoundPage() {
  useDocumentTitle('Page not found')
  return (
    <section>
      <h1>Page not found</h1>
      <p>The page you are looking for doesn&apos;t exist.</p>
      <Link to="/">Go to the dashboard</Link>
    </section>
  )
}