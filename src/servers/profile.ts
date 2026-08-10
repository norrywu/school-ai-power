"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { profileSchema } from "@/validations/profile-validation";
import type { AuthUser, UserRole } from "@/types/auth-type";

/**
 * Mengambil profil pengguna yang sedang terautentikasi dari server.
 * Mengembalikan `null` jika pengguna belum login atau sesi tidak valid.
 */
export async function getProfile(): Promise<AuthUser | null> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return null;
    }

    const rawRole = (session.user as Record<string, unknown>).role;

    return {
      id: session.user.id,
      email: session.user.email ?? null,
      name: session.user.name ?? null,
      role: (typeof rawRole === "string" ? rawRole : null) as UserRole | null,
    };
  } catch {
    return null;
  }
}

type SaveProfileResult = {
  user: AuthUser | null;
  message: string;
};

/**
 * Menyimpan pembaruan profil pengguna (nama, email, password).
 * Dipakai oleh `NavUser` lewat `useMutation`.
 */
export async function saveProfile(data?: FormData | undefined): Promise<SaveProfileResult> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Anda harus login terlebih dahulu.");
  }

  const name = data?.get("name") as string | null;
  const email = data?.get("email") as string | null;
  const password = data?.get("password") as string | null;

  const validated = profileSchema.safeParse({
    name: name ?? "",
    email: email ?? "",
    password: password ?? "",
  });

  if (!validated.success) {
    const firstError = validated.error.issues[0]?.message ?? "Data tidak valid.";
    throw new Error(firstError);
  }

  // Perbarui nama pengguna jika berubah
  if (validated.data.name !== session.user.name) {
    await auth.api.updateUser({
      headers: await headers(),
      body: { name: validated.data.name },
    });
  }

  // Perbarui password jika diisi
  if (validated.data.password) {
    await auth.api.changePassword({
      headers: await headers(),
      body: {
        newPassword: validated.data.password,
        currentPassword: validated.data.password,
        revokeOtherSessions: false,
      },
    });
  }

  // Ambil data user terbaru setelah pembaruan
  const updatedSession = await auth.api.getSession({
    headers: await headers(),
  });

  const updatedRawRole = updatedSession?.user
    ? (updatedSession.user as Record<string, unknown>).role
    : null;

  const updatedUser: AuthUser | null = updatedSession?.user
    ? {
        id: updatedSession.user.id,
        email: updatedSession.user.email ?? null,
        name: updatedSession.user.name ?? null,
        role: (typeof updatedRawRole === "string" ? updatedRawRole : null) as UserRole | null,
      }
    : null;

  return {
    user: updatedUser,
    message: "Profil berhasil diperbarui.",
  };
}
