import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const onLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <button className="collapse-btn" onClick={() => setCollapsed((v) => !v)}>{collapsed ? '›' : '‹'}</button>
      <div className="logo">MYAPP</div>
      <nav>
        <NavLink to="/dashboard">Dashboard</NavLink>
        {user?.role === 'MasterAdmin' && <NavLink to="/users">Users</NavLink>}
        {user?.role === 'MasterAdmin' && <NavLink to="/settings">Settings</NavLink>}
      </nav>
      <button className="logout" onClick={onLogout}>Logout</button>
    </aside>
  )
}

export default Sidebar
