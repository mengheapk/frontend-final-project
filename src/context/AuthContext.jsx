import { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { seedUsers } from '../utils/seed'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [users, setUsers] = useLocalStorage('ep_users', seedUsers)
  const [sessionUserId, setSessionUserId] = useLocalStorage('ep_session', null)

  const currentUser = users.find((user) => user.id === sessionUserId) ?? null

  function login(name, email) {
    const cleanEmail = email.trim().toLowerCase()
    const existing = users.find((user) => user.email === cleanEmail)
    if (existing) {
      setSessionUserId(existing.id)
      return existing
    }
    const newUser = { id: crypto.randomUUID(), name: name.trim(), email: cleanEmail }
    setUsers((current) => [...current, newUser])
    setSessionUserId(newUser.id)
    return newUser
  }

  function logout() {
    setSessionUserId(null)
  }

  function updateProfile(changes) {
    if (!currentUser) return
    setUsers((current) =>
      current.map((user) => (user.id === currentUser.id ? { ...user, ...changes } : user)),
    )
  }

  const value = { currentUser, users, login, logout, updateProfile }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}