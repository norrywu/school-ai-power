"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Spinner } from "@/components/ui/spinner";
import { useSantri } from "@/hooks/use-santri";
import { useAssignSantriToHalaqah } from "@/hooks/use-halaqah";
import type { HalaqahWithPembimbing } from "@/services/halaqah-service";
import type { SantriWithRelations } from "@/services/santri-service";
import { Search, UserCheck } from "lucide-react";
import { getInitials } from "@/lib/utils";

interface AssignSantriSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  halaqah: HalaqahWithPembimbing | null;
}

function AssignSantriContent({
  halaqah,
  santriList,
  isLoading,
  onOpenChange,
}: {
  halaqah: HalaqahWithPembimbing;
  santriList: SantriWithRelations[];
  isLoading: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const assignSantri = useAssignSantriToHalaqah();

  const initialSelectedIds = useMemo(
    () =>
      santriList
        .filter((s) => s.halaqahId === halaqah.id)
        .map((s) => s.id),
    [halaqah.id, santriList]
  );

  const [selectedIds, setSelectedIds] = useState<string[]>(initialSelectedIds);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSantri = useMemo(
    () =>
      santriList.filter((s) =>
        s.nama.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [santriList, searchQuery]
  );

  const toggleSelect = (santriId: string) => {
    setSelectedIds((prev) =>
      prev.includes(santriId)
        ? prev.filter((id) => id !== santriId)
        : [...prev, santriId]
    );
  };

  const handleSave = () => {
    assignSantri.mutate(
      {
        halaqahId: halaqah.id,
        santriIds: selectedIds,
      },
      {
        onSuccess: () => onOpenChange(false),
      }
    );
  };

  return (
    <>
      <SheetHeader className="px-1 space-y-1">
        <SheetTitle className="flex items-center gap-2 text-base font-semibold">
          <UserCheck className="size-5 text-primary shrink-0" />
          Kelola Anggota Halaqah
        </SheetTitle>
        <SheetDescription className="text-xs">
          Pilih santri yang masuk ke dalam kelompok{" "}
          <span className="font-semibold text-foreground">{halaqah.nama}</span>.
        </SheetDescription>
      </SheetHeader>

      <div className="relative mt-3 mb-2 px-1">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Cari nama santri..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 h-9 text-xs"
        />
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground px-1 mb-2">
        <span>Terpilih: <strong className="text-foreground font-semibold">{selectedIds.length}</strong> Santri</span>
        {selectedIds.length > 0 && (
          <button
            type="button"
            onClick={() => setSelectedIds([])}
            className="text-destructive hover:underline font-medium text-xs"
          >
            Hapus Semua Pilihan
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pr-1 px-1">
        {isLoading ? (
          <div className="flex items-center justify-center p-12">
            <Spinner className="size-6 text-primary" />
          </div>
        ) : filteredSantri.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-8">
            Tidak ada data santri yang ditemukan.
          </p>
        ) : (
          filteredSantri.map((s) => {
            const isChecked = selectedIds.includes(s.id);
            const otherHalaqah =
              s.halaqahId && s.halaqahId !== halaqah.id ? s.halaqahNama : null;

            return (
              <Card
                key={s.id}
                onClick={() => toggleSelect(s.id)}
                className={`cursor-pointer transition-all duration-150 border ${
                  isChecked
                    ? "border-primary bg-primary/5 shadow-xs"
                    : "border-border/60 hover:border-border hover:bg-accent/40"
                }`}
              >
                <CardContent className="p-2.5 flex items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleSelect(s.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="size-4 rounded border-primary text-primary focus:ring-primary shrink-0 cursor-pointer"
                    />
                    <Avatar className="size-8 shrink-0">
                      <AvatarFallback className="text-xs bg-muted text-foreground font-medium">
                        {getInitials(s.nama)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold leading-snug truncate text-foreground">
                        {s.nama}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[11px] text-muted-foreground">
                          {s.jenisKelamin === "L" ? "Laki-laki" : "Perempuan"}
                        </span>
                        {s.kelasNama && (
                          <>
                            <span className="text-[9px] text-muted-foreground/60">•</span>
                            <span className="text-[11px] text-muted-foreground font-medium">
                              {s.kelasNama}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {otherHalaqah && !isChecked && (
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0.5 shrink-0 font-normal">
                      {otherHalaqah}
                    </Badge>
                  )}
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      <SheetFooter className="mt-auto flex gap-2 pt-3 border-t px-1">
        <Button
          onClick={handleSave}
          disabled={assignSantri.isPending}
          className="flex-1"
          size="sm"
        >
          {assignSantri.isPending && <Spinner data-icon="inline-start" />}
          Simpan Anggota ({selectedIds.length})
        </Button>
        <SheetClose asChild>
          <Button variant="outline" size="sm" disabled={assignSantri.isPending}>
            Batal
          </Button>
        </SheetClose>
      </SheetFooter>
    </>
  );
}

export function AssignSantriSheet({
  open,
  onOpenChange,
  halaqah,
}: AssignSantriSheetProps) {
  const { data: santriList = [], isLoading } = useSantri();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col sm:max-w-md p-4">
        {halaqah && open && (
          <AssignSantriContent
            key={`${halaqah.id}-${open}`}
            halaqah={halaqah}
            santriList={santriList}
            isLoading={isLoading}
            onOpenChange={onOpenChange}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}
