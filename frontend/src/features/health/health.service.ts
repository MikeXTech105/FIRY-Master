import axiosInstance from "../../api/axiosInstance";
import { API_ENDPOINTS } from "../../api/endpoints";
import type { HealthResponse } from "./health.types";

export const getHealthStatus = async (): Promise<HealthResponse> => {
  const response = await axiosInstance.get<HealthResponse>(
    API_ENDPOINTS.HEALTH
  );

  return response.data;
};