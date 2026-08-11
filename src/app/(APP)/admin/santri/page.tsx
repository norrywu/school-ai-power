"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SantriTable } from "./_components/santri-table";
import { SantriFormSheet } from "./_components/santri-form-sheet";

export default function SantriPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Manajemen Santri</h2>
          <p className="text-sm text-muted-foreground">
            Kelola biodata santri di lingkungan Pondok Pesantren.
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2 size-4" />
          Tambah Santri
        </Button>
      </div>

      <SantriTable />

      <SantriFormSheet open={isCreateOpen} onOpenChange={setIsCreateOpen} />
    </div>
  );
}
