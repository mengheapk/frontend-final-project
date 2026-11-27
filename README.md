# Event Planning Portal

A React web app for creating, managing and sharing events, with RSVPs, a monthly calendar and tasks inside events. Built for the INF 651 Front-end Web Development final project at the American University of Phnom Penh.

**Live site:** https://frontend-final-project-weld.vercel.app/

## Features

- Log in or sign up with a name and email, and log out
- Create, edit and delete your own events (with form validation)
- Event list with search and category / upcoming / past filters
- Event detail page with a guest list and tasks
- Month calendar view
- Share an event with a link that opens on any device
- RSVP as going, maybe, or can't go, logged in or as a guest
- Tasks inside events, assigned to users, with due dates
- Dashboard with upcoming events, your RSVPs, and your open tasks
- Profile page with name editing and a light/dark theme
- Data saved in the browser between sessions (localStorage)
- Responsive layout with a mobile menu, and a 404 page

## Getting started

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev      # start the dev server at http://localhost:5173
npm run build    # production build in dist/
npm run lint     # check the code with ESLint
```

## Demo accounts

No password is needed. Use the demo buttons on the login page, or enter one of these emails:

| Name | Email |
| --- | --- |
| Boromey Chan | boromey@aupp.edu.kh |
| Sievyiek Chhea | sievyiek@aupp.edu.kh |
| Dara Sok | dara.sok@example.com |

To reset the demo data, clear the site's localStorage in your browser's developer tools and reload.

## Tech stack

React + Vite, React Router, date-fns, CSS Modules, localStorage, deployed on Vercel.

## Project structure

```
src/
  context/      AuthContext, EventsContext, ThemeContext (global state)
  hooks/        useLocalStorage, useDocumentTitle
  pages/        one component per route
  components/   layout, events, calendar, share, rsvp, tasks
  utils/        seed data, share-link encoding
  styles/       global styles and theme variables
```

## Known limitation

There is no backend, so each browser keeps its own data. A shared link opens the event on any device, but a guest's RSVP is saved only on the guest's device.

## Team

| Member | Built |
| --- | --- |
| Mengheap Khan (leader) | Project setup, contexts, login, profile and theme, dashboard, navigation, code reviews |
| Sievyiek Chhea | Event form, event list, event detail, tasks |
| Chanboromey Chhay | Calendar, share links, RSVP page, RSVP buttons, guest list |