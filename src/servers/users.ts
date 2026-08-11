"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { userSchema, type UserInput } from "@/validations/users-validation";

/**
 * Server action untuk membuat pengguna baru.
 */
export async function createUserAction(data: UserInput) {
  const reqHeaders = await headers();

  const hasPermission = await auth.api.userHasPermission({
    headers: reqHeaders,
    body: {
      permissions: {
        user: ["create"],
      },
    },
  });

  if (!hasPermission.success) {
    throw new Error("Akses ditolak. Anda tidak memiliki izin membuat pengguna.");
  }

  const parsed = userSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message || "Input tidak valid.");
  }

  const res = await auth.api.createUser({
    headers: reqHeaders,
    body: {
      email: parsed.data.email,
      password: parsed.data.password,
      name: parsed.data.name,
      role: parsed.data.role,
    },
  });

  return res;
}

/**
 * Server action untuk memperbarui pengguna.
 */
export async function updateUserAction(
  userId: string,
  data: Partial<UserInput>
) {
  const reqHeaders = await headers();

  const hasPermission = await auth.api.userHasPermission({
    headers: reqHeaders,
    body: {
      permissions: {
        user: ["update"],
      },
    },
  });

  if (!hasPermission.success) {
    throw new Error("Akses ditolak. Anda tidak memiliki izin memperbarui pengguna.");
  }

  if (data.name) {
    await auth.api.adminUpdateUser({
      headers: reqHeaders,
      body: {
        userId,
        data: {
          name: data.name,
        },
      },
    });
  }

  if (data.role) {
    await auth.api.setRole({
      headers: reqHeaders,
      body: {
        userId,
        role: data.role,
      },
    });
  }

  if (data.password && data.password.length >= 8) {
    await auth.api.setUserPassword({
      headers: reqHeaders,
      body: {
        userId,
        newPassword: data.password,
      },
    });
  }

  return { success: true };
}

/**
 * Server action untuk menghapus pengguna.
 */
export async function deleteUserAction(userId: string) {
  const reqHeaders = await headers();

  const hasPermission = await auth.api.userHasPermission({
    headers: reqHeaders,
    body: {
      permissions: {
        user: ["delete"],
      },
    },
  });

  if (!hasPermission.success) {
    throw new Error("Akses ditolak. Anda tidak memiliki izin menghapus pengguna.");
  }

  await auth.api.removeUser({
    headers: reqHeaders,
    body: {
      userId,
    },
  });

  return { success: true };
}
