import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getAdmin } from "@/lib/auth-guard";
import type { AuthUser, UserRole } from "@/types/auth-type";

export async function GET() {
  try {
    const adminUser = await getAdmin();

    if (!adminUser) {
      return NextResponse.json(
        { error: "Akses ditolak. Hanya admin yang diizinkan mengakses data pengguna." },
        { status: 403 }
      );
    }

    const res = await auth.api.listUsers({
      headers: await headers(),
      query: {
        limit: 100,
      },
    });

    if (!res?.users) {
      return NextResponse.json(
        { users: [] },
        {
          headers: {
            "Cache-Control": "private, max-age=60, stale-while-revalidate=30",
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
          "Cache-Control": "private, max-age=60, stale-while-revalidate=30",
        },
      }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Gagal mengambil data pengguna";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
