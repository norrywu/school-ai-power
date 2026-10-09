"use server";

import { headers } from "next/headers";
import { auth, db } from "@/lib/auth";
import { mataPelajaran } from "@/db/mata-pelajaran-schema";
import { eq } from "drizzle-orm";
import {
  mataPelajaranSchema,
  type MataPelajaranInput,
  type UpdateMataPelajaranInput,
} from "@/validations/mata-pelajaran-validation";

/**
 * Server action untuk membuat mata pelajaran baru.
 */
export async function createMataPelajaranAction(data: MataPelajaranInput) {
  const reqHeaders = await headers();

  const hasPermission = await auth.api.userHasPermission({
    headers: reqHeaders,
    body: {
      permissions: {
        mata_pelajaran: ["create"],
      },
    },
  });

  if (!hasPermission.success) {
    throw new Error("Akses ditolak. Anda tidak memiliki izin menambah data mata pelajaran.");
  }

  const parsed = mataPelajaranSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message || "Input data mata pelajaran tidak valid.");
  }

  const existing = await db
    .select()
    .from(mataPelajaran)
    .where(eq(mataPelajaran.kode, parsed.data.kode))
    .limit(1);

  if (existing.length > 0) {
    throw new Error(`Kode mata pelajaran '${parsed.data.kode}' sudah digunakan.`);
  }

  const [newMapel] = await db
    .insert(mataPelajaran)
    .values({
      nama: parsed.data.nama,
      kode: parsed.data.kode,
    })
    .returning();

  return newMapel;
}

/**
 * Server action untuk memperbarui data mata pelajaran.
 */
export async function updateMataPelajaranAction(
  id: string,
  data: UpdateMataPelajaranInput
) {
  const reqHeaders = await headers();

  const hasPermission = await auth.api.userHasPermission({
    headers: reqHeaders,
    body: {
      permissions: {
        mata_pelajaran: ["update"],
      },
    },
  });

  if (!hasPermission.success) {
    throw new Error("Akses ditolak. Anda tidak memiliki izin memperbarui data mata pelajaran.");
  }

  const updateData: Partial<MataPelajaranInput> = {};
  if (data.nama) updateData.nama = data.nama;
  if (data.kode) {
    const existing = await db
      .select()
      .from(mataPelajaran)
      .where(eq(mataPelajaran.kode, data.kode))
      .limit(1);

    if (existing.length > 0 && existing[0].id !== id) {
      throw new Error(`Kode mata pelajaran '${data.kode}' sudah digunakan.`);
    }
    updateData.kode = data.kode;
  }

  if (Object.keys(updateData).length === 0) {
    return { success: true };
  }

  await db
    .update(mataPelajaran)
    .set({
      ...updateData,
      updatedAt: new Date(),
    })
    .where(eq(mataPelajaran.id, id));

  return { success: true };
}

/**
 * Server action untuk menghapus data mata pelajaran.
 */
export async function deleteMataPelajaranAction(id: string) {
  const reqHeaders = await headers();

  const hasPermission = await auth.api.userHasPermission({
    headers: reqHeaders,
    body: {
      permissions: {
        mata_pelajaran: ["delete"],
      },
    },
  });

  if (!hasPermission.success) {
    throw new Error("Akses ditolak. Anda tidak memiliki izin menghapus data mata pelajaran.");
  }

  await db.delete(mataPelajaran).where(eq(mataPelajaran.id, id));

  return { success: true };
}
