import { useAuth } from "../auth/auth.state";

const DashboardPage = () => {
  const { auth } = useAuth();

  return (
    <div className="page">
      <h1>Dashboard</h1>
      <div className="card">
        <p>Welcome, <strong>{auth?.username}</strong>.</p>
        <p>Your role is <strong>{auth?.role}</strong>.</p>
        <p>Use the sidebar to navigate pages based on your permissions.</p>
      </div>
    </div>
  );
};

export default DashboardPage;
