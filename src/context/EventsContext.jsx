import { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { createSeedEvents } from '../utils/seed'
import { useAuth } from './AuthContext'

const EventsContext = createContext(null)

export function EventsProvider({ children }) {
  const [events, setEvents] = useLocalStorage('ep_events', createSeedEvents)
  const { currentUser } = useAuth()

  function updateOne(id, update) {
    setEvents((current) => current.map((event) => (event.id === id ? update(event) : event)))
  }

  function getEvent(id) {
    return events.find((event) => event.id === id)
  }

  function addEvent(data) {
    const id = crypto.randomUUID()
    const event = {
      ...data,
      id,
      ownerId: currentUser?.id ?? null,
      createdAt: new Date().toISOString(),
      rsvps: [],
      tasks: [],
    }
    setEvents((current) => [...current, event])
    return id
  }

  function updateEvent(id, changes) {
    updateOne(id, (event) => ({ ...event, ...changes }))
  }

  function deleteEvent(id) {
    setEvents((current) => current.filter((event) => event.id !== id))
  }

  function importEvent(event) {
    setEvents((current) =>
      current.some((existing) => existing.id === event.id)
        ? current
        : [...current, { ...event, rsvps: event.rsvps ?? [], tasks: event.tasks ?? [] }],
    )
  }

  function setRsvp(eventId, status, guestName) {
    const name = currentUser ? currentUser.name : (guestName ?? '').trim()
    if (!name) return
    const userId = currentUser?.id ?? null
    const isSamePerson = (rsvp) =>
      userId ? rsvp.userId === userId : !rsvp.userId && rsvp.name.toLowerCase() === name.toLowerCase()

    updateOne(eventId, (event) => ({
      ...event,
      rsvps: [
        ...event.rsvps.filter((rsvp) => !isSamePerson(rsvp)),
        { userId, name, status, respondedAt: new Date().toISOString() },
      ],
    }))
  }

  function addTask(eventId, task) {
    const newTask = {
      id: crypto.randomUUID(),
      title: task.title,
      assigneeId: task.assigneeId ?? null,
      dueDate: task.dueDate ?? '',
      done: false,
    }
    updateOne(eventId, (event) => ({ ...event, tasks: [...event.tasks, newTask] }))
  }

  function updateTask(eventId, taskId, changes) {
    updateOne(eventId, (event) => ({
      ...event,
      tasks: event.tasks.map((task) => (task.id === taskId ? { ...task, ...changes } : task)),
    }))
  }

  function deleteTask(eventId, taskId) {
    updateOne(eventId, (event) => ({
      ...event,
      tasks: event.tasks.filter((task) => task.id !== taskId),
    }))
  }

  const value = {
    events,
    getEvent,
    addEvent,
    updateEvent,
    deleteEvent,
    importEvent,
    setRsvp,
    addTask,
    updateTask,
    deleteTask,
  }
  return <EventsContext.Provider value={value}>{children}</EventsContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useEvents() {
  const context = useContext(EventsContext)
  if (!context) throw new Error('useEvents must be used inside EventsProvider')
  return context
}