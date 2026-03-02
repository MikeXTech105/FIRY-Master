import { useCallback, useEffect, useState } from "react";
import { getPages, getRolePermissionPageIds, getRoles, setRolePermissions } from "./rbac.service";
import type { PagePermission, Role } from "./rbac.types";

const PermissionsPage = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [pages, setPages] = useState<PagePermission[]>([]);
  const [selectedRoleId, setSelectedRoleId] = useState(0);
  const [selectedPageIds, setSelectedPageIds] = useState<number[]>([]);
  const [message, setMessage] = useState("");

  const loadBase = useCallback(async () => {
    const [roleData, pageData] = await Promise.all([getRoles(), getPages()]);
    setRoles(roleData);
    setPages(pageData);
    if (roleData.length > 0) setSelectedRoleId(roleData[0].id);
  }, []);

    useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadBase();
  }, [loadBase]);

    useEffect(() => {
    const loadPermissions = async () => {
      if (!selectedRoleId) return;
      const ids = await getRolePermissionPageIds(selectedRoleId);
      setSelectedPageIds(ids);
    };
    loadPermissions();
  }, [selectedRoleId]);

  const togglePage = (pageId: number) => {
    setSelectedPageIds((prev) => (prev.includes(pageId) ? prev.filter((id) => id !== pageId) : [...prev, pageId]));
  };

  const save = async () => {
    await setRolePermissions({ roleId: selectedRoleId, pageIds: selectedPageIds });
    setMessage("Permissions updated successfully.");
  };

  return (
    <div className="page">
      <h1>Role Permissions</h1>
      <section className="card stack">
        <label>Select Role</label>
        <select value={selectedRoleId} onChange={(e) => setSelectedRoleId(Number(e.target.value))}>
          {roles.map((role) => <option key={role.id} value={role.id}>{role.name}</option>)}
        </select>

        <h3>Allowed Pages</h3>
        <div className="checkbox-grid">
          {pages.map((page) => (
            <label key={page.id} className="checkbox-item">
              <input type="checkbox" checked={selectedPageIds.includes(page.id)} onChange={() => togglePage(page.id)} />
              {page.name} <span className="small">({page.route})</span>
            </label>
          ))}
        </div>

        <button onClick={save}>Save Permissions</button>
        {message && <p className="success">{message}</p>}
      </section>
    </div>
  );
};

export default PermissionsPage;
