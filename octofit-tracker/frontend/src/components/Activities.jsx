import { useEffect, useState } from 'react'

import { fetchCollection } from '../api'

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchCollection('activities')
      .then((records) => {
        if (isMounted) {
          setActivities(records)
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
    return <p className="text-secondary">Loading activities...</p>
  }

  if (status === 'error') {
    return <p className="text-danger">Unable to load activities: {error}</p>
  }

  return (
    <div className="list-group resource-list">
      {activities.map((activity) => (
        <article className="list-group-item" key={activity._id ?? `${activity.activityType}-${activity.completedAt}`}>
          <div>
            <h2>{activity.activityType}</h2>
            <p>{activity.user?.displayName ?? 'OctoFit member'}</p>
          </div>
          <div className="activity-metrics">
            <span>{activity.durationMinutes} min</span>
            <span>{activity.caloriesBurned} cal</span>
          </div>
        </article>
      ))}
    </div>
  )
}

export default Activities