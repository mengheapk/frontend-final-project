import { useParams } from 'react-router-dom'
import useDocumentTitle from '../hooks/useDocumentTitle'

export default function EventFormPage() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  useDocumentTitle(isEdit ? 'Edit event' : 'New event')

  return (
    <section>
      <h1>{isEdit ? 'Edit event' : 'New event'}</h1>
      <p>Coming in A1.</p>
    </section>
  )
}