"use server";

import { headers } from "next/headers";
import { auth, db } from "@/lib/auth";
import { setoranHafalan } from "@/db/setoran-hafalan-schema";
import { surah } from "@/db/surah-schema";
import { eq } from "drizzle-orm";
import {
  setoranHafalanSchema,
  type SetoranHafalanInput,
  type UpdateSetoranHafalanInput,
} from "@/validations/setoran-hafalan-validation";

/**
 * Server action untuk mencatat setoran hafalan baru.
 */
export async function createSetoranHafalanAction(data: SetoranHafalanInput) {
  const reqHeaders = await headers();

  const hasPermission = await auth.api.userHasPermission({
    headers: reqHeaders,
    body: {
      permissions: {
        setoran_hafalan: ["create"],
      },
    },
  });

  if (!hasPermission.success) {
    throw new Error("Akses ditolak. Anda tidak memiliki izin mencatat setoran hafalan.");
  }

  const parsed = setoranHafalanSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message || "Input setoran hafalan tidak valid.");
  }

  // Validasi jumlah ayat sesuai dengan surah yang dipilih di database
  const [selectedSurah] = await db
    .select({
      nama: surah.nama,
      jumlahAyat: surah.jumlahAyat,
    })
    .from(surah)
    .where(eq(surah.id, parsed.data.surahId));

  if (!selectedSurah) {
    throw new Error("Surah Al-Qur'an tidak ditemukan.");
  }

  if (parsed.data.ayatMulai > selectedSurah.jumlahAyat) {
    throw new Error(
      `Ayat mulai (${parsed.data.ayatMulai}) melebihi total ayat Surah ${selectedSurah.nama} (${selectedSurah.jumlahAyat} ayat).`
    );
  }

  if (parsed.data.ayatSelesai > selectedSurah.jumlahAyat) {
    throw new Error(
      `Ayat selesai (${parsed.data.ayatSelesai}) melebihi total ayat Surah ${selectedSurah.nama} (${selectedSurah.jumlahAyat} ayat).`
    );
  }

  const [newSetoran] = await db
    .insert(setoranHafalan)
    .values({
      santriId: parsed.data.santriId,
      halaqahId: parsed.data.halaqahId ?? null,
      tanggal: new Date(parsed.data.tanggal),
      surahId: parsed.data.surahId,
      ayatMulai: parsed.data.ayatMulai,
      ayatSelesai: parsed.data.ayatSelesai,
      jenis: parsed.data.jenis,
      nilai: parsed.data.nilai ?? null,
      catatan: parsed.data.catatan ?? null,
    })
    .returning();

  return newSetoran;
}

/**
 * Server action untuk memperbarui data setoran hafalan.
 */
export async function updateSetoranHafalanAction(
  setoranId: string,
  data: UpdateSetoranHafalanInput
) {
  const reqHeaders = await headers();

  const hasPermission = await auth.api.userHasPermission({
    headers: reqHeaders,
    body: {
      permissions: {
        setoran_hafalan: ["update"],
      },
    },
  });

  if (!hasPermission.success) {
    throw new Error("Akses ditolak. Anda tidak memiliki izin memperbarui setoran hafalan.");
  }

  const updateData: Record<string, unknown> = {};
  if (data.santriId !== undefined) updateData.santriId = data.santriId;
  if (data.halaqahId !== undefined) updateData.halaqahId = data.halaqahId;
  if (data.tanggal !== undefined) updateData.tanggal = new Date(data.tanggal);
  if (data.surahId !== undefined) updateData.surahId = data.surahId;
  if (data.ayatMulai !== undefined) updateData.ayatMulai = data.ayatMulai;
  if (data.ayatSelesai !== undefined) updateData.ayatSelesai = data.ayatSelesai;
  if (data.jenis !== undefined) updateData.jenis = data.jenis;
  if (data.nilai !== undefined) updateData.nilai = data.nilai;
  if (data.catatan !== undefined) updateData.catatan = data.catatan;

  if (Object.keys(updateData).length === 0) {
    return { success: true };
  }

  // Jika surahId atau ayatMulai atau ayatSelesai diubah, periksa validasi jumlah ayat surah
  if (data.surahId || data.ayatMulai !== undefined || data.ayatSelesai !== undefined) {
    const [existingSetoran] = await db
      .select()
      .from(setoranHafalan)
      .where(eq(setoranHafalan.id, setoranId));

    if (!existingSetoran) {
      throw new Error("Data setoran hafalan tidak ditemukan.");
    }

    const checkSurahId = data.surahId || existingSetoran.surahId;
    const checkAyatMulai = data.ayatMulai !== undefined ? data.ayatMulai : existingSetoran.ayatMulai;
    const checkAyatSelesai = data.ayatSelesai !== undefined ? data.ayatSelesai : existingSetoran.ayatSelesai;

    const [selectedSurah] = await db
      .select({
        nama: surah.nama,
        jumlahAyat: surah.jumlahAyat,
      })
      .from(surah)
      .where(eq(surah.id, checkSurahId));

    if (selectedSurah) {
      if (checkAyatMulai > selectedSurah.jumlahAyat) {
        throw new Error(
          `Ayat mulai (${checkAyatMulai}) melebihi total ayat Surah ${selectedSurah.nama} (${selectedSurah.jumlahAyat} ayat).`
        );
      }
      if (checkAyatSelesai > selectedSurah.jumlahAyat) {
        throw new Error(
          `Ayat selesai (${checkAyatSelesai}) melebihi total ayat Surah ${selectedSurah.nama} (${selectedSurah.jumlahAyat} ayat).`
        );
      }
    }
  }

  await db
    .update(setoranHafalan)
    .set({
      ...updateData,
      updatedAt: new Date(),
    })
    .where(eq(setoranHafalan.id, setoranId));

  return { success: true };
}

/**
 * Server action untuk menghapus data setoran hafalan.
 */
export async function deleteSetoranHafalanAction(setoranId: string) {
  const reqHeaders = await headers();

  const hasPermission = await auth.api.userHasPermission({
    headers: reqHeaders,
    body: {
      permissions: {
        setoran_hafalan: ["delete"],
      },
    },
  });

  if (!hasPermission.success) {
    throw new Error("Akses ditolak. Anda tidak memiliki izin menghapus setoran hafalan.");
  }

  await db.delete(setoranHafalan).where(eq(setoranHafalan.id, setoranId));

  return { success: true };
}
