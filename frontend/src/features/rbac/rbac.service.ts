import axiosInstance from "../../api/axiosInstance";
import type {
  CreatePageRequest,
  CreateRoleRequest,
  CreateUserRequest,
  PagePermission,
  Role,
  SetRolePermissionsRequest,
  User,
} from "./rbac.types";

export const getRoles = async (): Promise<Role[]> => {
  const response = await axiosInstance.get<Role[]>("/rbac/roles");
  return response.data;
};

export const getUsers = async (): Promise<User[]> => {
  const response = await axiosInstance.get<User[]>("/rbac/users");
  return response.data;
};

export const getPages = async (): Promise<PagePermission[]> => {
  const response = await axiosInstance.get<PagePermission[]>("/rbac/pages");
  return response.data;
};

export const getRolePermissionPageIds = async (roleId: number): Promise<number[]> => {
  const response = await axiosInstance.get<number[]>(`/rbac/permissions/${roleId}`);
  return response.data;
};

export const createRole = async (payload: CreateRoleRequest): Promise<void> => {
  await axiosInstance.post("/rbac/roles", payload);
};

export const createUser = async (payload: CreateUserRequest): Promise<void> => {
  await axiosInstance.post("/rbac/users", payload);
};

export const createPage = async (payload: CreatePageRequest): Promise<void> => {
  await axiosInstance.post("/rbac/pages", payload);
};

export const setRolePermissions = async (payload: SetRolePermissionsRequest): Promise<void> => {
  await axiosInstance.put("/rbac/permissions", payload);
};
