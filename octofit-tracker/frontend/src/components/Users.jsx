import { useEffect, useState } from 'react'

import { fetchCollection } from '../api'

const usersEndpoint = '/api/users/'

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchCollection('users', usersEndpoint)
      .then((records) => {
        if (isMounted) {
          setUsers(records)
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
    return <p className="text-secondary">Loading users...</p>
  }

  if (status === 'error') {
    return <p className="text-danger">Unable to load users: {error}</p>
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Team</th>
            <th>Level</th>
            <th>Weekly goal</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id ?? user.username}>
              <td>{user.displayName}</td>
              <td>{user.username}</td>
              <td>{user.team?.name ?? user.team ?? 'Unassigned'}</td>
              <td className="text-capitalize">{user.fitnessLevel}</td>
              <td>{user.weeklyGoalMinutes} min</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users