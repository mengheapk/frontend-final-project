import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import ProtectedRoute from './components/layout/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import EventsPage from './pages/EventsPage'
import EventFormPage from './pages/EventFormPage'
import EventDetailPage from './pages/EventDetailPage'
import RsvpPage from './pages/RsvpPage'
import CalendarPage from './pages/CalendarPage'
import ProfilePage from './pages/ProfilePage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/events/:id/rsvp" element={<RsvpPage />} />

        <Route element={<ProtectedRoute />}>
          <Route index element={<DashboardPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/new" element={<EventFormPage />} />
          <Route path="/events/:id" element={<EventDetailPage />} />
          <Route path="/events/:id/edit" element={<EventFormPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}