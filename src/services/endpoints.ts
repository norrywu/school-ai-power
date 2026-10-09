export const API_ENDPOINTS = {
  SURAH: "/api/surah",
  ADMIN: {
    USERS: "/api/admin/users",
    USER_DETAIL: (id: string) => `/api/admin/users/${id}`,
    SANTRI: "/api/admin/santri",
    SANTRI_DETAIL: (id: string) => `/api/admin/santri/${id}`,
    CLASSES: "/api/admin/classes",
    CLASS_DETAIL: (id: string) => `/api/admin/classes/${id}`,
    HALAQAH: "/api/admin/tahfidz/halaqah",
    HALAQAH_DETAIL: (id: string) => `/api/admin/tahfidz/halaqah/${id}`,
    MATA_PELAJARAN: "/api/admin/mata-pelajaran",
    MATA_PELAJARAN_DETAIL: (id: string) => `/api/admin/mata-pelajaran/${id}`,
    GURU_PELAJARAN: "/api/admin/guru-pelajaran",
    GURU_PELAJARAN_DETAIL: (id: string) => `/api/admin/guru-pelajaran/${id}`,
  },
  TEACHER: {
    HALAQAH: "/api/teacher/tahfidz/halaqah",
    SANTRI: "/api/teacher/santri",
    SETORAN_HAFALAN: "/api/teacher/tahfidz/setoran",
    MATA_PELAJARAN: "/api/teacher/mata-pelajaran",
  },
} as const;
