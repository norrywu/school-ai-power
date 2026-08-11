"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import type { AuthUser, UserRole } from "@/types/auth-type";

/**
 * Mengambil daftar seluruh pengguna menggunakan Better Auth Admin API.
 */
export async function getUsers(): Promise<AuthUser[]> {
  const res = await auth.api.listUsers({
    headers: await headers(),
    query: {
      limit: 100,
    },
  });

  if (!res?.users) {
    return [];
  }

  return res.users.map((u) => ({
    id: u.id,
    email: u.email ?? null,
    name: u.name ?? null,
    role: (u.role as UserRole) ?? null,
  }));
}
