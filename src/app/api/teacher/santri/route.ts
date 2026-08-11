import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth, db } from "@/lib/auth";
import { santri } from "@/db/santri-schema";
import { halaqah } from "@/db/halaqah-schema";
import { kelas } from "@/db/kelas-schema";
import { desc, eq } from "drizzle-orm";
import type { SantriWithRelations } from "@/services/santri-service";

export async function GET() {
  try {
    const reqHeaders = await headers();
    const session = await auth.api.getSession({
      headers: reqHeaders,
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: "Anda harus login terlebih dahulu." },
        { status: 401 }
      );
    }

    const currentTeacherId = session.user.id;

    // Ambil HANYA santri yang berada di bawah halaqah milik Ustadz yang sedang login
    const santriList: SantriWithRelations[] = await db
      .select({
        id: santri.id,
        nama: santri.nama,
        jenisKelamin: santri.jenisKelamin,
        kelasId: santri.kelasId,
        kelasNama: kelas.nama,
        kelasTingkat: kelas.tingkat,
        halaqahId: santri.halaqahId,
        halaqahNama: halaqah.nama,
        createdAt: santri.createdAt,
        updatedAt: santri.updatedAt,
      })
      .from(santri)
      .innerJoin(halaqah, eq(santri.halaqahId, halaqah.id))
      .leftJoin(kelas, eq(santri.kelasId, kelas.id))
      .where(eq(halaqah.pembimbingId, currentTeacherId))
      .orderBy(desc(santri.createdAt));

    return NextResponse.json(
      { santri: santriList },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Gagal mengambil data santri bimbingan";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
