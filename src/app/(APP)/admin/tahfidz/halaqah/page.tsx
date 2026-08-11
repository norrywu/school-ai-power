"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HalaqahTable } from "./_components/halaqah-table";
import { HalaqahFormSheet } from "./_components/halaqah-form-sheet";

export default function HalaqahPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Manajemen Halaqah Tahfidz</h2>
          <p className="text-sm text-muted-foreground">
            Kelola grup halaqah tahfidz dan penetapan pembimbing ustadz.
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2 size-4" />
          Tambah Halaqah
        </Button>
      </div>

      <HalaqahTable />

      <HalaqahFormSheet open={isCreateOpen} onOpenChange={setIsCreateOpen} />
    </div>
  );
}
