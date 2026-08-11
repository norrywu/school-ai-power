"use server";

import { headers } from "next/headers";
import { auth, db } from "@/lib/auth";
import { santri } from "@/db/santri-schema";
import { eq } from "drizzle-orm";
import {
  santriSchema,
  type SantriInput,
  type UpdateSantriInput,
} from "@/validations/santri-validation";

/**
 * Server action untuk membuat data santri baru.
 */
export async function createSantriAction(data: SantriInput) {
  const reqHeaders = await headers();

  const hasPermission = await auth.api.userHasPermission({
    headers: reqHeaders,
    body: {
      permissions: {
        santri: ["create"],
      },
    },
  });

  if (!hasPermission.success) {
    throw new Error("Akses ditolak. Anda tidak memiliki izin menambah data santri.");
  }

  const parsed = santriSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message || "Input data santri tidak valid.");
  }

  const [newSantri] = await db
    .insert(santri)
    .values({
      nama: parsed.data.nama,
      jenisKelamin: parsed.data.jenisKelamin,
      kelasId: parsed.data.kelasId ?? null,
      halaqahId: parsed.data.halaqahId ?? null,
    })
    .returning();

  return newSantri;
}

/**
 * Server action untuk memperbarui data santri.
 */
export async function updateSantriAction(
  santriId: string,
  data: UpdateSantriInput
) {
  const reqHeaders = await headers();

  const hasPermission = await auth.api.userHasPermission({
    headers: reqHeaders,
    body: {
      permissions: {
        santri: ["update"],
      },
    },
  });

  if (!hasPermission.success) {
    throw new Error("Akses ditolak. Anda tidak memiliki izin memperbarui data santri.");
  }

  const updateData: Partial<SantriInput> = {};
  if (data.nama !== undefined) updateData.nama = data.nama;
  if (data.jenisKelamin !== undefined) updateData.jenisKelamin = data.jenisKelamin;
  if (data.kelasId !== undefined) updateData.kelasId = data.kelasId;
  if (data.halaqahId !== undefined) updateData.halaqahId = data.halaqahId;

  if (Object.keys(updateData).length === 0) {
    return { success: true };
  }

  await db
    .update(santri)
    .set({
      ...updateData,
      updatedAt: new Date(),
    })
    .where(eq(santri.id, santriId));

  return { success: true };
}

/**
 * Server action untuk menghapus data santri.
 */
export async function deleteSantriAction(santriId: string) {
  const reqHeaders = await headers();

  const hasPermission = await auth.api.userHasPermission({
    headers: reqHeaders,
    body: {
      permissions: {
        santri: ["delete"],
      },
    },
  });

  if (!hasPermission.success) {
    throw new Error("Akses ditolak. Anda tidak memiliki izin menghapus data santri.");
  }

  await db.delete(santri).where(eq(santri.id, santriId));

  return { success: true };
}
