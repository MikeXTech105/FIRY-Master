import { useState } from 'react'
import api from '../api/axios'

const Settings = () => {
  const [form, setForm] = useState({ fullName: '', email: '', password: '', role: 'User' })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')
    try {
      await api.post('/users', form)
      setMessage('User created successfully.')
      setForm({ fullName: '', email: '', password: '', role: 'User' })
    } catch (err) {
      setError(err?.response?.data?.error || 'Failed to create user.')
    }
  }

  return (
    <div>
      <h2>Settings</h2>
      <form className="card form-inline" onSubmit={submit}>
        <input placeholder="Full Name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
        <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>
        <button>Create User</button>
        {message && <p>{message}</p>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default Settings
