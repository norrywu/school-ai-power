import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth, db } from "@/lib/auth";
import { mataPelajaran } from "@/db/mata-pelajaran-schema";
import { createMataPelajaranAction } from "@/servers/mata-pelajaran";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const reqHeaders = await headers();

    const hasPermission = await auth.api.userHasPermission({
      headers: reqHeaders,
      body: {
        permissions: {
          mata_pelajaran: ["list"],
        },
      },
    });

    if (!hasPermission.success) {
      return NextResponse.json(
        { error: "Akses ditolak. Anda tidak memiliki izin melihat data mata pelajaran." },
        { status: 403 }
      );
    }

    const list = await db
      .select()
      .from(mataPelajaran)
      .orderBy(desc(mataPelajaran.createdAt));

    return NextResponse.json(
      { mataPelajaran: list },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Gagal mengambil data mata pelajaran";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await createMataPelajaranAction(body);
    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Gagal membuat mata pelajaran";
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
