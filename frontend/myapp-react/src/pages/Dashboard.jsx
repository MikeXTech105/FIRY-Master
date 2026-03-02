import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
  const { user } = useAuth()
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome back, {user?.fullName}.</p>
    </div>
  )
}

export default Dashboard
