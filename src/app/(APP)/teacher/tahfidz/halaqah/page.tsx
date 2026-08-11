"use client";

import { useTeacherHalaqah, useTeacherSantri } from "@/hooks/use-teacher-tahfidz";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { BookOpenCheck, UserCheck } from "lucide-react";

export default function TeacherHalaqahPage() {
  const { data: halaqahList = [], isLoading: loadingHalaqah } = useTeacherHalaqah();
  const { data: santriList = [], isLoading: loadingSantri } = useTeacherSantri();

  if (loadingHalaqah || loadingSantri) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Halaqah Saya</h2>
        <p className="text-sm text-muted-foreground">
          Daftar kelompok halaqah tahfidz dan santri yang Anda bimbing secara pribadi.
        </p>
      </div>

      {halaqahList.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">
          <BookOpenCheck className="mx-auto size-12 text-muted-foreground/50 mb-3" />
          <p className="font-semibold text-foreground">Belum Ada Halaqah Ditetapkan</p>
          <p className="text-sm">
            Anda belum ditetapkan sebagai pembimbing pada kelompok halaqah manapun. Hubungi Administrator.
          </p>
        </Card>
      ) : (
        <div className="space-y-6">
          {halaqahList.map((h) => {
            const members = santriList.filter((s) => s.halaqahId === h.id);

            return (
              <Card key={h.id} className="border shadow-xs">
                <CardHeader className="flex flex-row items-center justify-between pb-3 border-b">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <BookOpenCheck className="size-5 text-primary" />
                      {h.nama}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Pembimbing: <span className="font-medium text-foreground">{h.pembimbingNama || "Saya"}</span>
                    </CardDescription>
                  </div>
                  <Badge variant="default" className="text-xs">
                    {members.length} Santri Bimbingan
                  </Badge>
                </CardHeader>

                <CardContent className="pt-4">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Daftar Santri Anggota ({members.length})
                  </h4>

                  {members.length === 0 ? (
                    <p className="text-sm text-muted-foreground italic py-4 text-center">
                      Belum ada santri yang ditambahkan ke halaqah ini.
                    </p>
                  ) : (
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {members.map((s) => (
                        <div
                          key={s.id}
                          className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/40 transition-colors"
                        >
                          <Avatar className="size-9">
                            <AvatarFallback className="text-xs bg-primary/10 text-primary font-semibold">
                              {getInitials(s.nama)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium leading-none truncate">
                              {s.nama}
                            </p>
                            <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
                              <span>{s.jenisKelamin === "L" ? "Laki-laki" : "Perempuan"}</span>
                              {s.kelasNama && (
                                <>
                                  <span>•</span>
                                  <span className="font-medium text-foreground">{s.kelasNama}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
