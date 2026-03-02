export interface Role {
  id: number;
  name: string;
}

export interface User {
  id: number;
  username: string;
  isActive: boolean;
  role: string;
}

export interface PagePermission {
  id: number;
  name: string;
  route: string;
}

export interface CreateRoleRequest {
  name: string;
}

export interface CreateUserRequest {
  username: string;
  password: string;
  roleId: number;
}

export interface CreatePageRequest {
  name: string;
  route: string;
}

export interface SetRolePermissionsRequest {
  roleId: number;
  pageIds: number[];
}
