import { Navigate, Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import { useAuth } from './context/AuthContext'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Settings from './pages/Settings'
import Users from './pages/Users'
import ProtectedRoute from './routes/ProtectedRoute'

const Shell = ({ children }) => (
  <div className="app-shell">
    <Sidebar />
    <main className="main-content">{children}</main>
  </div>
)

function App() {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<ProtectedRoute><Shell><Dashboard /></Shell></ProtectedRoute>} />
      <Route path="/users" element={<ProtectedRoute roles={['MasterAdmin']}><Shell><Users /></Shell></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute roles={['MasterAdmin']}><Shell><Settings /></Shell></ProtectedRoute>} />
      <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />} />
    </Routes>
  )
}

export default App
