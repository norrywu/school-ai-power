export const API_ENDPOINTS = {
  ADMIN: {
    USERS: "/api/admin/users",
    USER_DETAIL: (id: string) => `/api/admin/users/${id}`,
  },
} as const;
