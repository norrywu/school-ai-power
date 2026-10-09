import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth, db } from "@/lib/auth";
import { guruPelajaran } from "@/db/guru-pelajaran-schema";
import { user } from "@/db/auth-schema";
import { mataPelajaran } from "@/db/mata-pelajaran-schema";
import { assignGuruPelajaranAction } from "@/servers/guru-pelajaran";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  try {
    const reqHeaders = await headers();

    const hasPermission = await auth.api.userHasPermission({
      headers: reqHeaders,
      body: {
        permissions: {
          guru_pelajaran: ["list"],
        },
      },
    });

    if (!hasPermission.success) {
      return NextResponse.json(
        { error: "Akses ditolak. Anda tidak memiliki izin melihat penugasan guru." },
        { status: 403 }
      );
    }

    const assignments = await db
      .select({
        id: guruPelajaran.id,
        guruId: guruPelajaran.guruId,
        guruName: user.name,
        guruEmail: user.email,
        mataPelajaranId: guruPelajaran.mataPelajaranId,
        mataPelajaranNama: mataPelajaran.nama,
        mataPelajaranKode: mataPelajaran.kode,
        createdAt: guruPelajaran.createdAt,
      })
      .from(guruPelajaran)
      .leftJoin(user, eq(guruPelajaran.guruId, user.id))
      .leftJoin(mataPelajaran, eq(guruPelajaran.mataPelajaranId, mataPelajaran.id))
      .orderBy(desc(guruPelajaran.createdAt));

    return NextResponse.json(
      { guruPelajaran: assignments },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Gagal mengambil data penugasan guru";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await assignGuruPelajaranAction(body);
    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Gagal menugaskan guru";
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
