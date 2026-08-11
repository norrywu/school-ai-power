"use server";

import { headers } from "next/headers";
import { auth, db } from "@/lib/auth";
import { halaqah } from "@/db/halaqah-schema";
import { santri } from "@/db/santri-schema";
import { eq, inArray } from "drizzle-orm";
import {
  halaqahSchema,
  type HalaqahInput,
  type UpdateHalaqahInput,
} from "@/validations/halaqah-validation";

/**
 * Server action untuk membuat data halaqah baru.
 */
export async function createHalaqahAction(data: HalaqahInput) {
  const reqHeaders = await headers();

  const hasPermission = await auth.api.userHasPermission({
    headers: reqHeaders,
    body: {
      permissions: {
        halaqah: ["create"],
      },
    },
  });

  if (!hasPermission.success) {
    throw new Error("Akses ditolak. Anda tidak memiliki izin menambah data halaqah.");
  }

  const parsed = halaqahSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message || "Input data halaqah tidak valid.");
  }

  const [newHalaqah] = await db
    .insert(halaqah)
    .values({
      nama: parsed.data.nama,
      pembimbingId: parsed.data.pembimbingId ?? null,
    })
    .returning();

  return newHalaqah;
}

/**
 * Server action untuk memperbarui data halaqah.
 */
export async function updateHalaqahAction(
  halaqahId: string,
  data: UpdateHalaqahInput
) {
  const reqHeaders = await headers();

  const hasPermission = await auth.api.userHasPermission({
    headers: reqHeaders,
    body: {
      permissions: {
        halaqah: ["update"],
      },
    },
  });

  if (!hasPermission.success) {
    throw new Error("Akses ditolak. Anda tidak memiliki izin memperbarui data halaqah.");
  }

  const updateData: Partial<HalaqahInput> = {};
  if (data.nama !== undefined) updateData.nama = data.nama;
  if (data.pembimbingId !== undefined) updateData.pembimbingId = data.pembimbingId;

  if (Object.keys(updateData).length === 0) {
    return { success: true };
  }

  await db
    .update(halaqah)
    .set({
      ...updateData,
      updatedAt: new Date(),
    })
    .where(eq(halaqah.id, halaqahId));

  return { success: true };
}

/**
 * Server action untuk menghapus data halaqah.
 */
export async function deleteHalaqahAction(halaqahId: string) {
  const reqHeaders = await headers();

  const hasPermission = await auth.api.userHasPermission({
    headers: reqHeaders,
    body: {
      permissions: {
        halaqah: ["delete"],
      },
    },
  });

  if (!hasPermission.success) {
    throw new Error("Akses ditolak. Anda tidak memiliki izin menghapus data halaqah.");
  }

  await db.delete(halaqah).where(eq(halaqah.id, halaqahId));

  return { success: true };
}

/**
 * Server action untuk menetapkan daftar santri ke sebuah halaqah.
 */
export async function assignSantriToHalaqahAction(
  halaqahId: string,
  santriIds: string[]
) {
  const reqHeaders = await headers();

  const hasPermission = await auth.api.userHasPermission({
    headers: reqHeaders,
    body: {
      permissions: {
        halaqah: ["update"],
      },
    },
  });

  if (!hasPermission.success) {
    throw new Error("Akses ditolak. Anda tidak memiliki izin mengelola anggota halaqah.");
  }

  // 1. Lepas halaqahId untuk santri yang sebelumnya di halaqah ini
  await db
    .update(santri)
    .set({ halaqahId: null })
    .where(eq(santri.halaqahId, halaqahId));

  // 2. Tetapkan halaqahId untuk santri yang baru dipilih
  if (santriIds.length > 0) {
    await db
      .update(santri)
      .set({ halaqahId })
      .where(inArray(santri.id, santriIds));
  }

  return { success: true };
}
