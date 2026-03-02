import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

const RbacAdminPage = () => {
  const [roles, setRoles] = useState<Record<string, unknown>[]>([]);
  const [users, setUsers] = useState<Record<string, unknown>[]>([]);
  const [pages, setPages] = useState<Record<string, unknown>[]>([]);

  useEffect(() => {
    const load = async () => {
      const [rolesRes, usersRes, pagesRes] = await Promise.all([
        axiosInstance.get("/rbac/roles"),
        axiosInstance.get("/rbac/users"),
        axiosInstance.get("/rbac/pages"),
      ]);
      setRoles(rolesRes.data);
      setUsers(usersRes.data);
      setPages(pagesRes.data);
    };
    load();
  }, []);

  return (
    <div>
      <h2>RBAC Management</h2>
      <p>Master Admin can create users, roles and set permissions using API endpoints.</p>
      <h3>Roles</h3>
      <pre>{JSON.stringify(roles, null, 2)}</pre>
      <h3>Users</h3>
      <pre>{JSON.stringify(users, null, 2)}</pre>
      <h3>Pages</h3>
      <pre>{JSON.stringify(pages, null, 2)}</pre>
    </div>
  );
};

export default RbacAdminPage;
