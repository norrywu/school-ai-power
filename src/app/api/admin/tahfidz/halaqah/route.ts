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

    const hasPermission = await auth.api.userHasPermission({
      headers: reqHeaders,
      body: {
        permissions: {
          halaqah: ["list"],
        },
      },
    });

    if (!hasPermission.success) {
      return NextResponse.json(
        { error: "Akses ditolak. Anda tidak memiliki izin melihat data halaqah." },
        { status: 403 }
      );
    }

    const santriCountSubquery = db
      .select({
        halaqahId: santri.halaqahId,
        totalSantri: count(santri.id).as("total_santri"),
      })
      .from(santri)
      .groupBy(santri.halaqahId)
      .as("santri_count");

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
      error instanceof Error ? error.message : "Gagal mengambil data halaqah";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
