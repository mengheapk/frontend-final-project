// Placeholder until B2. Keep the same props when replacing it.
export default function ShareButton({ event }) {
  return (
    <button type="button" disabled title={`Share ${event?.title ?? ''}`}>
      Share (coming in B2)
    </button>
  )
}