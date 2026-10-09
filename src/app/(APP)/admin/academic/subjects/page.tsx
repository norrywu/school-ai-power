"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MataPelajaranTable } from "./_components/mata-pelajaran-table";
import { MataPelajaranFormSheet } from "./_components/mata-pelajaran-form-sheet";

export default function SubjectsPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Manajemen Mata Pelajaran</h2>
          <p className="text-sm text-muted-foreground">
            Kelola kurikulum dan daftar mata pelajaran di Pondok Pesantren.
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2 size-4" />
          Tambah Mata Pelajaran
        </Button>
      </div>

      <MataPelajaranTable />

      <MataPelajaranFormSheet open={isCreateOpen} onOpenChange={setIsCreateOpen} />
    </div>
  );
}
