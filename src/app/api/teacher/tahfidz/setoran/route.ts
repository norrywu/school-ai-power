import { NextResponse, type NextRequest } from "next/server";
import { headers } from "next/headers";
import { auth, db } from "@/lib/auth";
import { setoranHafalan } from "@/db/setoran-hafalan-schema";
import { santri } from "@/db/santri-schema";
import { halaqah } from "@/db/halaqah-schema";
import { surah } from "@/db/surah-schema";
import { and, count, desc, eq, ilike } from "drizzle-orm";
import type { SetoranHafalanWithRelations } from "@/services/setoran-hafalan-service";

export async function GET(request: NextRequest) {
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
    const { searchParams } = new URL(request.url);

    const search = (searchParams.get("search") || searchParams.get("q") || "").trim();
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const limit = Math.max(1, Math.min(100, Number(searchParams.get("limit")) || 10));
    const offset = (page - 1) * limit;

    const whereConditions = search
      ? and(
          eq(halaqah.pembimbingId, currentTeacherId),
          ilike(santri.nama, `%${search}%`)
        )
      : eq(halaqah.pembimbingId, currentTeacherId);

    // Hitung total data setoran berdasarkan filter bimbingan ustadz & nama santri
    const countResult = await db
      .select({ total: count() })
      .from(setoranHafalan)
      .innerJoin(santri, eq(setoranHafalan.santriId, santri.id))
      .innerJoin(halaqah, eq(santri.halaqahId, halaqah.id))
      .where(whereConditions);

    const totalRecords = Number(countResult[0]?.total || 0);
    const totalPages = Math.ceil(totalRecords / limit) || 1;

    // Ambil data setoran ter-paginasi dan ter-filter nama santri
    const setoranList: SetoranHafalanWithRelations[] = await db
      .select({
        id: setoranHafalan.id,
        santriId: setoranHafalan.santriId,
        santriNama: santri.nama,
        halaqahId: setoranHafalan.halaqahId,
        halaqahNama: halaqah.nama,
        tanggal: setoranHafalan.tanggal,
        surahId: setoranHafalan.surahId,
        surahNama: surah.nama,
        surahNomor: surah.nomor,
        ayatMulai: setoranHafalan.ayatMulai,
        ayatSelesai: setoranHafalan.ayatSelesai,
        jenis: setoranHafalan.jenis,
        nilai: setoranHafalan.nilai,
        catatan: setoranHafalan.catatan,
        createdAt: setoranHafalan.createdAt,
        updatedAt: setoranHafalan.updatedAt,
      })
      .from(setoranHafalan)
      .innerJoin(santri, eq(setoranHafalan.santriId, santri.id))
      .innerJoin(halaqah, eq(santri.halaqahId, halaqah.id))
      .leftJoin(surah, eq(setoranHafalan.surahId, surah.id))
      .where(whereConditions)
      .orderBy(desc(setoranHafalan.tanggal))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(
      {
        setoranHafalan: setoranList,
        pagination: {
          page,
          limit,
          totalRecords,
          totalPages,
        },
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Gagal mengambil data setoran hafalan pengajar";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
