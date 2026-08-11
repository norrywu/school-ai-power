import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth, db } from "@/lib/auth";
import { halaqah } from "@/db/halaqah-schema";
import { user } from "@/db/auth-schema";
import { santri } from "@/db/santri-schema";
import { count, desc, eq } from "drizzle-orm";
import type { HalaqahWithPembimbing } from "@/services/halaqah-service";

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

    // Subquery hitung total santri per halaqah
    const santriCountSubquery = db
      .select({
        halaqahId: santri.halaqahId,
        totalSantri: count(santri.id).as("total_santri"),
      })
      .from(santri)
      .groupBy(santri.halaqahId)
      .as("santri_count");

    // Ambil HANYA halaqah milik Ustadz yang sedang login (pembimbingId = currentTeacherId)
    const rows = await db
      .select({
        id: halaqah.id,
        nama: halaqah.nama,
        pembimbingId: halaqah.pembimbingId,
        pembimbingNama: user.name,
        pembimbingEmail: user.email,
        totalSantri: santriCountSubquery.totalSantri,
        createdAt: halaqah.createdAt,
        updatedAt: halaqah.updatedAt,
      })
      .from(halaqah)
      .leftJoin(user, eq(halaqah.pembimbingId, user.id))
      .leftJoin(santriCountSubquery, eq(halaqah.id, santriCountSubquery.halaqahId))
      .where(eq(halaqah.pembimbingId, currentTeacherId))
      .orderBy(desc(halaqah.createdAt));

    const halaqahList: HalaqahWithPembimbing[] = rows.map((r) => ({
      ...r,
      totalSantri: Number(r.totalSantri || 0),
    }));

    return NextResponse.json(
      { halaqah: halaqahList },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Gagal mengambil data halaqah pengajar";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
