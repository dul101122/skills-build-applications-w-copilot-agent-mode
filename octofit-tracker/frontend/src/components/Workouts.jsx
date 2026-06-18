import { useEffect, useState } from 'react'

import { fetchCollection } from '../api'

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchCollection('workouts', workoutsEndpoint)
      .then((records) => {
        if (isMounted) {
          setWorkouts(records)
          setStatus('ready')
        }
      })
      .catch((requestError) => {
        if (isMounted) {
          setError(requestError.message)
          setStatus('error')
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  if (status === 'loading') {
    return <p className="text-secondary">Loading workouts...</p>
  }

  if (status === 'error') {
    return <p className="text-danger">Unable to load workouts: {error}</p>
  }

  return (
    <div className="row g-3">
      {workouts.map((workout) => (
        <div className="col-lg-4" key={workout._id ?? workout.title}>
          <article className="resource-card h-100">
            <span className="badge text-bg-primary text-capitalize mb-3">{workout.difficulty}</span>
            <h2>{workout.title}</h2>
            <p>{workout.description}</p>
            <strong>{workout.durationMinutes} min · {workout.focusArea}</strong>
          </article>
        </div>
      ))}
    </div>
  )
}

export default Workouts