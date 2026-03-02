import { useCallback, useEffect, useState, type FormEvent } from "react";
import { createRole, getRoles } from "./rbac.service";
import type { Role } from "./rbac.types";

const RolesPage = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    const data = await getRoles();
    setRoles(data);
  }, []);

    useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, [load]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    await createRole({ name });
    setMessage("Role created successfully.");
    setName("");
    await load();
  };

  return (
    <div className="page">
      <h1>Roles</h1>
      <div className="grid-2">
        <section className="card">
          <h3>Create Role</h3>
          <form onSubmit={submit} className="stack">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Role name" required />
            <button type="submit">Create Role</button>
            {message && <p className="success">{message}</p>}
          </form>
        </section>
        <section className="card">
          <h3>Role List</h3>
          <table>
            <thead><tr><th>ID</th><th>Name</th></tr></thead>
            <tbody>{roles.map((role) => <tr key={role.id}><td>{role.id}</td><td>{role.name}</td></tr>)}</tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default RolesPage;
