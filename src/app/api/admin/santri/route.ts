import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth, db } from "@/lib/auth";
import { santri } from "@/db/santri-schema";
import { kelas } from "@/db/kelas-schema";
import { desc, eq } from "drizzle-orm";
import type { SantriWithKelas } from "@/services/santri-service";

export async function GET() {
  try {
    const reqHeaders = await headers();

    const hasPermission = await auth.api.userHasPermission({
      headers: reqHeaders,
      body: {
        permissions: {
          santri: ["list"],
        },
      },
    });

    if (!hasPermission.success) {
      return NextResponse.json(
        { error: "Akses ditolak. Anda tidak memiliki izin melihat data santri." },
        { status: 403 }
      );
    }

    const santriList: SantriWithKelas[] = await db
      .select({
        id: santri.id,
        nama: santri.nama,
        jenisKelamin: santri.jenisKelamin,
        kelasId: santri.kelasId,
        kelasNama: kelas.nama,
        kelasTingkat: kelas.tingkat,
        createdAt: santri.createdAt,
        updatedAt: santri.updatedAt,
      })
      .from(santri)
      .leftJoin(kelas, eq(santri.kelasId, kelas.id))
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
      error instanceof Error ? error.message : "Gagal mengambil data santri";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
