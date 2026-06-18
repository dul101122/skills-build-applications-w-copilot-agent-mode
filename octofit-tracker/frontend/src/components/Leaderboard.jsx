import { useEffect, useState } from 'react'

import { fetchCollection } from '../api'

const leaderboardEndpoint = '/api/leaderboard/'

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchCollection('leaderboard', leaderboardEndpoint)
      .then((records) => {
        if (isMounted) {
          setLeaderboard(records)
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
    return <p className="text-secondary">Loading leaderboard...</p>
  }

  if (status === 'error') {
    return <p className="text-danger">Unable to load leaderboard: {error}</p>
  }

  return (
    <div className="leaderboard-stack">
      {leaderboard.map((entry) => (
        <article className="leaderboard-row" key={entry._id ?? entry.rank}>
          <span className="rank">#{entry.rank}</span>
          <div>
            <h2>{entry.user?.displayName ?? 'OctoFit member'}</h2>
            <p>{entry.streakDays} day streak</p>
          </div>
          <strong>{entry.points} pts</strong>
        </article>
      ))}
    </div>
  )
}

export default Leaderboard