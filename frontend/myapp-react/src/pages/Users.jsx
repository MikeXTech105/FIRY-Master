import { useEffect, useState } from 'react'
import api from '../api/axios'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    api.get('/users').then((res) => setUsers(res.data))
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <div className="card">
        <table>
          <thead>
            <tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th></tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}><td>{u.fullName}</td><td>{u.email}</td><td>{u.role}</td><td>{u.isActive ? 'Active' : 'Inactive'}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users
