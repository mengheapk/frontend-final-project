import { useParams } from 'react-router-dom'
import useDocumentTitle from '../hooks/useDocumentTitle'
import RsvpButtons from '../components/rsvp/RsvpButtons'

export default function RsvpPage() {
  const { id } = useParams()
  useDocumentTitle('RSVP')

  return (
    <section>
      <h1>RSVP</h1>
      <p>Coming in B2.</p>
      <RsvpButtons eventId={id} />
    </section>
  )
}