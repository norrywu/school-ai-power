"use client";

import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableCard } from "@/components/common/data-table-card";
import { useTeacherSetoran } from "@/hooks/use-teacher-tahfidz";
import { useDebounce } from "@/hooks/use-debounce";
import type { SetoranHafalanWithRelations } from "@/services/setoran-hafalan-service";
import { getSetoranHafalanColumns } from "./_components/setoran-hafalan-columns";
import { SetoranHafalanSkeleton } from "./_components/setoran-hafalan-skeleton";
import { DeleteSetoranHafalanDialog } from "./_components/delete-setoran-hafalan-dialog";
import { TeacherSetoranFormSheet } from "./_components/teacher-setoran-form-sheet";

export default function TeacherSetoranPage() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 500);
  const limit = 10;

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    setPage(1);
  };

  const { data, isLoading, error } = useTeacherSetoran({
    page,
    limit,
    search: debouncedSearch,
  });

  const setoranList = data?.setoranHafalan || [];
  const pagination = data?.pagination;

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [setoranToEdit, setSetoranToEdit] =
    useState<SetoranHafalanWithRelations | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [setoranToDelete, setSetoranToDelete] =
    useState<SetoranHafalanWithRelations | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleEdit = (item: SetoranHafalanWithRelations) => {
    setSetoranToEdit(item);
    setIsEditOpen(true);
  };

  const handleDelete = (item: SetoranHafalanWithRelations) => {
    setSetoranToDelete(item);
    setIsDeleteOpen(true);
  };

  const columns = useMemo(
    () =>
      getSetoranHafalanColumns({
        onEdit: handleEdit,
        onDelete: handleDelete,
      }),
    [],
  );

  if (isLoading && !debouncedSearch && page === 1) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <SetoranHafalanSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-destructive">
        {(error as Error).message}
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Input &amp; Riwayat Setoran
          </h2>
          <p className="text-sm text-muted-foreground">
            Kelola dan catat progres hafalan Al-Qur&apos;an santri bimbingan
            Anda (ziyadah &amp; murajaah).
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2 size-4" />
          Input Setoran Baru
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Cari nama santri..."
          value={searchInput}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-9 h-9"
        />
      </div>

      <DataTableCard<SetoranHafalanWithRelations>
        title="Riwayat Setoran Hafalan Bimbingan Saya"
        caption="Daftar setoran hafalan dari santri yang berada di kelompok halaqah Anda."
        columns={columns}
        data={setoranList}
        rowKey={(item) => item.id}
        emptyMessage={
          debouncedSearch
            ? `Tidak ada setoran hafalan ditemukan untuk "${debouncedSearch}".`
            : "Belum ada setoran hafalan dari santri bimbingan Anda."
        }
        pagination={
          pagination
            ? {
                page: pagination.page,
                totalPages: pagination.totalPages,
                totalRecords: pagination.totalRecords,
                onPageChange: (newPage) => setPage(newPage),
              }
            : undefined
        }
      />

      <TeacherSetoranFormSheet
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
      />

      <TeacherSetoranFormSheet
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        setoranToEdit={setoranToEdit}
      />

      <DeleteSetoranHafalanDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        setoran={setoranToDelete}
      />
    </div>
  );
}
