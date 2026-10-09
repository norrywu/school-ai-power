"use server";

import { headers } from "next/headers";
import { auth, db } from "@/lib/auth";
import { guruPelajaran } from "@/db/guru-pelajaran-schema";
import { user } from "@/db/auth-schema";
import { and, eq } from "drizzle-orm";
import {
  guruPelajaranSchema,
  type GuruPelajaranInput,
} from "@/validations/guru-pelajaran-validation";

/**
 * Server action untuk menugaskan guru ke mata pelajaran.
 */
export async function assignGuruPelajaranAction(data: GuruPelajaranInput) {
  const reqHeaders = await headers();

  const hasPermission = await auth.api.userHasPermission({
    headers: reqHeaders,
    body: {
      permissions: {
        guru_pelajaran: ["create"],
      },
    },
  });

  if (!hasPermission.success) {
    throw new Error("Akses ditolak. Anda tidak memiliki izin menugaskan guru ke mata pelajaran.");
  }

  const parsed = guruPelajaranSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message || "Input penugasan tidak valid.");
  }

  // 1. Verifikasi bahwa user yang dipilih terdaftar dan ber-role 'teacher'
  const targetUser = await db
    .select()
    .from(user)
    .where(eq(user.id, parsed.data.guruId))
    .limit(1);

  if (targetUser.length === 0) {
    throw new Error("User guru tidak ditemukan.");
  }

  if (targetUser[0].role !== "teacher" && targetUser[0].role !== "admin") {
    throw new Error("User yang dipilih bukan merupakan pengajar (role teacher).");
  }

  // 2. Cek apakah penugasan sudah ada
  const existing = await db
    .select()
    .from(guruPelajaran)
    .where(
      and(
        eq(guruPelajaran.guruId, parsed.data.guruId),
        eq(guruPelajaran.mataPelajaranId, parsed.data.mataPelajaranId)
      )
    )
    .limit(1);

  if (existing.length > 0) {
    throw new Error("Guru ini sudah ditugaskan mengajar mata pelajaran ini.");
  }

  const [newAssignment] = await db
    .insert(guruPelajaran)
    .values({
      guruId: parsed.data.guruId,
      mataPelajaranId: parsed.data.mataPelajaranId,
    })
    .returning();

  return newAssignment;
}

/**
 * Server action untuk menghapus penugasan guru dari mata pelajaran.
 */
export async function removeGuruPelajaranAction(assignmentId: string) {
  const reqHeaders = await headers();

  const hasPermission = await auth.api.userHasPermission({
    headers: reqHeaders,
    body: {
      permissions: {
        guru_pelajaran: ["delete"],
      },
    },
  });

  if (!hasPermission.success) {
    throw new Error("Akses ditolak. Anda tidak memiliki izin menghapus penugasan guru.");
  }

  await db.delete(guruPelajaran).where(eq(guruPelajaran.id, assignmentId));

  return { success: true };
}
