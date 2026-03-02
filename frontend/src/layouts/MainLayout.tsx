import { NavLink, useNavigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../features/auth/auth.state";

const menuConfig = [
  { label: "Dashboard", route: "/dashboard" },
  { label: "Users", route: "/users" },
  { label: "Roles", route: "/roles" },
  { label: "Pages", route: "/pages" },
  { label: "Permissions", route: "/permissions" },
];

const MainLayout = ({ children }: { children: ReactNode }) => {
  const { auth, canAccess, setAuth } = useAuth();
  const navigate = useNavigate();

  const menuItems = menuConfig.filter((item) => canAccess(item.route));

  const logout = () => {
    setAuth(null);
    navigate("/login");
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h2>FIRY Admin</h2>
        <p className="small">{auth?.username} ({auth?.role})</p>
        <nav className="menu">
          {menuItems.map((item) => (
            <NavLink key={item.route} to={item.route} className={({ isActive }) => `menu-link ${isActive ? "active" : ""}`}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </aside>
      <main className="content">{children}</main>
    </div>
  );
};

export default MainLayout;
