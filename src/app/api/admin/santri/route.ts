import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth, db } from "@/lib/auth";
import { santri, type Santri } from "@/db/santri-schema";
import { desc } from "drizzle-orm";

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

    const santriList: Santri[] = await db
      .select()
      .from(santri)
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
