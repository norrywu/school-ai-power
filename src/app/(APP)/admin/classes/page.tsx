"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KelasTable } from "./_components/kelas-table";
import { KelasFormSheet } from "./_components/kelas-form-sheet";

export default function ClassesPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Manajemen Kelas</h2>
          <p className="text-sm text-muted-foreground">
            Kelola data kelas dan tingkat pembelajaran di Pondok Pesantren.
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2 size-4" />
          Tambah Kelas
        </Button>
      </div>

      <KelasTable />

      <KelasFormSheet open={isCreateOpen} onOpenChange={setIsCreateOpen} />
    </div>
  );
}
