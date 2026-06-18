import { useEffect, useState } from 'react'

import { fetchCollection } from '../api'

const teamsEndpoint = '/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchCollection('teams', teamsEndpoint)
      .then((records) => {
        if (isMounted) {
          setTeams(records)
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
    return <p className="text-secondary">Loading teams...</p>
  }

  if (status === 'error') {
    return <p className="text-danger">Unable to load teams: {error}</p>
  }

  return (
    <div className="row g-3">
      {teams.map((team) => (
        <div className="col-md-6" key={team._id ?? team.name}>
          <article className="resource-card h-100">
            <span className="badge text-bg-success mb-3">{team.city}</span>
            <h2>{team.name}</h2>
            <p>{team.mascot}</p>
            <strong>{team.weeklyGoalMinutes} team minutes</strong>
          </article>
        </div>
      ))}
    </div>
  )
}

export default Teams