import axiosInstance from "../../api/axiosInstance";
import type { LoginRequest, LoginResponse } from "./auth.types";

export const login = async (payload: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>("/auth/login", payload);
  return response.data;
};
