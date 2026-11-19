import { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import useDocumentTitle from '../hooks/useDocumentTitle'

// Basic working version so the team can log in while building. Polished in L2.
export default function LoginPage() {
  useDocumentTitle('Log in')
  const { currentUser, login } = useAuth()
  const location = useLocation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  // Once logged in, go back to the page that sent us here (or the dashboard).
  if (currentUser) return <Navigate to={location.state?.from ?? '/'} replace />

  function handleSubmit(e) {
    e.preventDefault()
    login(name, email)
  }

  return (
    <section>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="name">Name</label>
          <br />
          <input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </p>
        <p>
          <label htmlFor="email">Email</label>
          <br />
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </p>
        <button type="submit">Log in</button>
      </form>
    </section>
  )
}