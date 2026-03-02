import { useCallback, useEffect, useState, type FormEvent } from "react";
import { createUser, getRoles, getUsers } from "./rbac.service";
import type { Role, User } from "./rbac.types";

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState<number>(0);
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    const [usersData, rolesData] = await Promise.all([getUsers(), getRoles()]);
    setUsers(usersData);
    setRoles(rolesData);
    if (!roleId && rolesData.length > 0) setRoleId(rolesData[0].id);
  }, [roleId]);

    useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, [load]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await createUser({ username, password, roleId });
    setMessage("User created successfully.");
    setUsername("");
    setPassword("");
    await load();
  };

  return (
    <div className="page">
      <h1>Users</h1>
      <div className="grid-2">
        <section className="card">
          <h3>Create User</h3>
          <form onSubmit={handleSubmit} className="stack">
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required />
            <select value={roleId} onChange={(e) => setRoleId(Number(e.target.value))} required>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>{role.name}</option>
              ))}
            </select>
            <button type="submit">Create User</button>
            {message && <p className="success">{message}</p>}
          </form>
        </section>

        <section className="card">
          <h3>User List</h3>
          <table>
            <thead><tr><th>ID</th><th>Username</th><th>Role</th><th>Status</th></tr></thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td><td>{user.username}</td><td>{user.role}</td><td>{user.isActive ? "Active" : "Inactive"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default UsersPage;
