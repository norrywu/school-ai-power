import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth, db } from "@/lib/auth";
import { kelas, type Kelas } from "@/db/kelas-schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const reqHeaders = await headers();

    const hasPermission = await auth.api.userHasPermission({
      headers: reqHeaders,
      body: {
        permissions: {
          kelas: ["list"],
        },
      },
    });

    if (!hasPermission.success) {
      return NextResponse.json(
        { error: "Akses ditolak. Anda tidak memiliki izin melihat data kelas." },
        { status: 403 }
      );
    }

    const kelasList: Kelas[] = await db
      .select()
      .from(kelas)
      .orderBy(desc(kelas.createdAt));

    return NextResponse.json(
      { kelas: kelasList },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Gagal mengambil data kelas";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
