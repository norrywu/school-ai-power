"use server";

import { headers } from "next/headers";
import { auth, db } from "@/lib/auth";
import { kelas } from "@/db/kelas-schema";
import { eq } from "drizzle-orm";
import {
  kelasSchema,
  type KelasInput,
  type UpdateKelasInput,
} from "@/validations/kelas-validation";

/**
 * Server action untuk membuat data kelas baru.
 */
export async function createKelasAction(data: KelasInput) {
  const reqHeaders = await headers();

  const hasPermission = await auth.api.userHasPermission({
    headers: reqHeaders,
    body: {
      permissions: {
        kelas: ["create"],
      },
    },
  });

  if (!hasPermission.success) {
    throw new Error("Akses ditolak. Anda tidak memiliki izin menambah data kelas.");
  }

  const parsed = kelasSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message || "Input data kelas tidak valid.");
  }

  const [newKelas] = await db
    .insert(kelas)
    .values({
      nama: parsed.data.nama,
      tingkat: parsed.data.tingkat,
    })
    .returning();

  return newKelas;
}

/**
 * Server action untuk memperbarui data kelas.
 */
export async function updateKelasAction(
  kelasId: string,
  data: UpdateKelasInput
) {
  const reqHeaders = await headers();

  const hasPermission = await auth.api.userHasPermission({
    headers: reqHeaders,
    body: {
      permissions: {
        kelas: ["update"],
      },
    },
  });

  if (!hasPermission.success) {
    throw new Error("Akses ditolak. Anda tidak memiliki izin memperbarui data kelas.");
  }

  const updateData: Partial<KelasInput> = {};
  if (data.nama) updateData.nama = data.nama;
  if (data.tingkat) updateData.tingkat = data.tingkat;

  if (Object.keys(updateData).length === 0) {
    return { success: true };
  }

  await db
    .update(kelas)
    .set({
      ...updateData,
      updatedAt: new Date(),
    })
    .where(eq(kelas.id, kelasId));

  return { success: true };
}

/**
 * Server action untuk menghapus data kelas.
 */
export async function deleteKelasAction(kelasId: string) {
  const reqHeaders = await headers();

  const hasPermission = await auth.api.userHasPermission({
    headers: reqHeaders,
    body: {
      permissions: {
        kelas: ["delete"],
      },
    },
  });

  if (!hasPermission.success) {
    throw new Error("Akses ditolak. Anda tidak memiliki izin menghapus data kelas.");
  }

  await db.delete(kelas).where(eq(kelas.id, kelasId));

  return { success: true };
}
