import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import type { AuthUser, UserRole } from "@/types/auth-type";

export async function GET() {
  try {
    const reqHeaders = await headers();

    // Verifikasi izin akses membaca ("list") pada entitas "user"
    const hasPermission = await auth.api.userHasPermission({
      headers: reqHeaders,
      body: {
        permissions: {
          user: ["list"],
        },
      },
    });

    if (!hasPermission.success) {
      return NextResponse.json(
        { error: "Akses ditolak. Anda tidak memiliki izin melihat data pengguna." },
        { status: 403 }
      );
    }

    const res = await auth.api.listUsers({
      headers: reqHeaders,
      query: {
        limit: 100,
      },
    });

    if (!res?.users) {
      return NextResponse.json(
        { users: [] },
        {
          headers: {
            "Cache-Control": "no-store, max-age=0",
          },
        }
      );
    }

    const users: AuthUser[] = res.users.map((u) => ({
      id: u.id,
      email: u.email ?? null,
      name: u.name ?? null,
      role: (u.role as UserRole) ?? null,
    }));

    return NextResponse.json(
      { users },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Gagal mengambil data pengguna";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
