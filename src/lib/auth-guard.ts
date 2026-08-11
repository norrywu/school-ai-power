import "server-only";

import { redirect } from "next/navigation";
import { getProfile } from "@/servers/profile";
import type { AuthUser, UserRole } from "@/types/auth-type";
import { AUTH_ROUTES } from "@/constants/auth-constant";

export const ADMIN_ROLES: readonly UserRole[] = ["admin"];

export function isAdminRole(role: string | null | undefined): boolean {
  return role === "admin";
}

export function isTeacherRole(role: string | null | undefined): boolean {
  return role === "teacher";
}

/**
 * Mengambil data pengguna terautentikasi jika memiliki peran admin.
 * Mengembalikan `null` jika belum terautentikasi atau bukan admin.
 */
export async function getAdmin(): Promise<AuthUser | null> {
  const user = await getProfile();

  if (!user || !isAdminRole(user.role)) return null;

  return user;
}

/**
 * Memastikan pengguna sudah terautentikasi.
 * Jika belum login, otomatis melempar ke halaman login (`/auth/login`).
 */
export async function requireAuth(): Promise<AuthUser> {
  const user = await getProfile();

  if (!user) {
    redirect(AUTH_ROUTES.login);
  }

  return user;
}

/**
 * Memastikan pengguna terautentikasi DAN memiliki peran `admin`.
 * - Jika belum login → redirect ke `/auth/login`.
 * - Jika sudah login tetapi bukan admin (mis. teacher) → redirect ke `/teacher/dashboard`.
 */
export async function requireAdmin(): Promise<AuthUser> {
  const user = await getProfile();

  if (!user) {
    redirect(AUTH_ROUTES.login);
  }

  if (!isAdminRole(user.role)) {
    redirect("/teacher/dashboard");
  }

  return user;
}

/**
 * Memastikan pengguna terautentikasi DAN memiliki peran `teacher` atau `admin`.
 * Jika belum login → redirect ke `/auth/login`.
 */
export async function requireTeacher(): Promise<AuthUser> {
  const user = await getProfile();

  if (!user) {
    redirect(AUTH_ROUTES.login);
  }

  if (!isTeacherRole(user.role) && !isAdminRole(user.role)) {
    redirect("/auth/login");
  }

  return user;
}

/**
 * Memastikan pengguna terautentikasi DAN memiliki salah satu peran yang diizinkan (`allowedRoles`).
 * - Jika belum login → redirect ke `/auth/login`.
 * - Jika sudah login tetapi perannya tidak sesuai → redirect ke rute bawaan perannya.
 */
export async function requireRole(allowedRoles: UserRole[]): Promise<AuthUser> {
  const user = await getProfile();

  if (!user) {
    redirect(AUTH_ROUTES.login);
  }

  if (!user.role || !allowedRoles.includes(user.role)) {
    const fallbackRoute =
      user.role === "admin" ? "/admin/dashboard" : "/teacher/dashboard";
    redirect(fallbackRoute);
  }

  return user;
}
