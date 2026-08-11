"use client";

import Link from "next/link";
import { BookOpenCheck, Plus, UserCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useTeacherHalaqah,
  useTeacherSantri,
  useTeacherSetoran,
} from "@/hooks/use-teacher-tahfidz";
import { Badge } from "@/components/ui/badge";
import type { SetoranHafalanWithRelations } from "@/services/setoran-hafalan-service";

export default function TeacherDashboardPage() {
  const { data: halaqahList = [], isLoading: loadingHalaqah } = useTeacherHalaqah();
  const { data: santriList = [], isLoading: loadingSantri } = useTeacherSantri();
  const { data: setoranData, isLoading: loadingSetoran } = useTeacherSetoran({
    page: 1,
    limit: 5,
  });

  const totalHalaqah = halaqahList.length;
  const totalSantri = santriList.length;
  const setoranList: SetoranHafalanWithRelations[] = setoranData?.setoranHafalan || [];
  const totalSetoran = setoranData?.pagination?.totalRecords || setoranList.length;

  const recentSetoran = setoranList.slice(0, 5);

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dasbor Pengajar</h2>
          <p className="text-sm text-muted-foreground">
            Selamat datang Ustadz, kelola bimbingan halaqah dan setoran hafalan santri Anda.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <Link href="/teacher/tahfidz/halaqah">
              <Users className="mr-2 size-4" />
              Halaqah Saya
            </Link>
          </Button>
          <Button asChild>
            <Link href="/teacher/tahfidz/setoran">
              <Plus className="mr-2 size-4" />
              Input Setoran
            </Link>
          </Button>
        </div>
      </div>

      {/* Ringkasan Statistik */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Halaqah Saya</CardTitle>
            <BookOpenCheck className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            {loadingHalaqah ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold">{totalHalaqah} Kelompok</div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Kelompok tahfidz yang dibimbing
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Santri Bimbingan</CardTitle>
            <UserCheck className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            {loadingSantri ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold">{totalSantri} Santri</div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Khusus santri di halaqah Anda
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Setoran Hafalan</CardTitle>
            <BookOpenCheck className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            {loadingSetoran ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold">{totalSetoran} Catatan</div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Total setoran ziyadah &amp; murajaah
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Setoran Terbaru */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Setoran Hafalan Terbaru</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingSetoran ? (
            <div className="space-y-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : recentSetoran.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-6">
              Belum ada setoran hafalan dari santri bimbingan Anda.
            </p>
          ) : (
            <div className="space-y-3">
              {recentSetoran.map((s: SetoranHafalanWithRelations) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/40 transition-colors"
                >
                  <div className="space-y-1">
                    <p className="font-medium text-sm leading-none">{s.santriNama}</p>
                    <p className="text-xs text-muted-foreground">
                      Surah {s.surahNama} (Ayat {s.ayatMulai}-{s.ayatSelesai})
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={s.jenis === "ziyadah" ? "default" : "secondary"}>
                      {s.jenis === "ziyadah" ? "Ziyadah" : "Murajaah"}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(s.tanggal).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
