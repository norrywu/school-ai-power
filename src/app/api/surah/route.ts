import { NextResponse } from "next/server";
import { db } from "@/lib/auth";
import { surah } from "@/db/surah-schema";
import { asc } from "drizzle-orm";

export async function GET() {
  try {
    const surahList = await db
      .select()
      .from(surah)
      .orderBy(asc(surah.nomor));

    return NextResponse.json(
      { surah: surahList },
      {
        headers: {
          "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
        },
      }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Gagal mengambil data surah";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
