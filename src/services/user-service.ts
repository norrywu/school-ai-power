import api from "@/lib/axios";
import type { AuthUser } from "@/types/auth-type";
import { API_ENDPOINTS } from "@/services/endpoints";

export const userService = {
  getUsers: async (): Promise<AuthUser[]> => {
    const response = await api.get<{ users: AuthUser[] }>(
      API_ENDPOINTS.ADMIN.USERS,
    );
    return response.data.users || [];
  },
};
