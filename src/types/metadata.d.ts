import type { UserRole } from "@/types/auth-type";

/**
 * Bentuk user untuk keperluan TAMPILAN (footer sidebar, sheet profil).
 *
 * Sengaja dibuat superset struktural dari `AuthUser` minus `id`, jadi objek
 * dari store Zustand bisa langsung dioper ke `<NavUser user={...} />` tanpa
 * konversi apa pun.
 */
export type UserMetadata = {
  name: string | null;
  email: string | null;
  role: UserRole | null;
};
