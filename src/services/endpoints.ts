export const API_ENDPOINTS = {
  ADMIN: {
    USERS: "/api/admin/users",
    USER_DETAIL: (id: string) => `/api/admin/users/${id}`,
    SANTRI: "/api/admin/santri",
    SANTRI_DETAIL: (id: string) => `/api/admin/santri/${id}`,
    CLASSES: "/api/admin/classes",
    CLASS_DETAIL: (id: string) => `/api/admin/classes/${id}`,
  },
} as const;
