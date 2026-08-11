import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth, db } from "@/lib/auth";
import { halaqah } from "@/db/halaqah-schema";
import { user } from "@/db/auth-schema";
import { desc, eq } from "drizzle-orm";
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

    const halaqahList: HalaqahWithPembimbing[] = await db
      .select({
        id: halaqah.id,
        nama: halaqah.nama,
        pembimbingId: halaqah.pembimbingId,
        pembimbingNama: user.name,
        pembimbingEmail: user.email,
        createdAt: halaqah.createdAt,
        updatedAt: halaqah.updatedAt,
      })
      .from(halaqah)
      .leftJoin(user, eq(halaqah.pembimbingId, user.id))
      .orderBy(desc(halaqah.createdAt));

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
