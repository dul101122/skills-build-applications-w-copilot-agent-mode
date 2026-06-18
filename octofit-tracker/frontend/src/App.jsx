import { NavLink, Navigate, Route, Routes } from 'react-router-dom'

import { apiBaseUrl, codespaceApiConfigured } from './api'
import './App.css'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

const navigationItems = [
  { path: '/users', label: 'Users' },
  { path: '/teams', label: 'Teams' },
  { path: '/activities', label: 'Activities' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/workouts', label: 'Workouts' },
]

function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <span className="eyebrow">OctoFit Tracker</span>
          <h1>Activity command center</h1>
        </div>
        <nav className="nav flex-column gap-2" aria-label="OctoFit sections">
          {navigationItems.map((item) => (
            <NavLink className="nav-link" key={item.path} to={item.path}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="content-panel">
        <header className="content-header">
          <div>
            <span className="eyebrow">API base</span>
            <code>{apiBaseUrl}</code>
          </div>
          {!codespaceApiConfigured && (
            <div className="alert alert-warning mb-0" role="status">
              VITE_CODESPACE_NAME is unset; using localhost:8000.
            </div>
          )}
        </header>

        <section className="resource-surface">
          <Routes>
            <Route path="/" element={<Navigate to="/users" replace />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </section>
      </main>
    </div>
  )
}

export default App
