"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UsersTable } from "./_components/users-table";
import { UserFormSheet } from "./_components/user-form-sheet";

export default function UsersPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Daftar Pengguna</h2>
          <p className="text-sm text-muted-foreground">
            Kelola data akun pengguna dan peran di lingkungan Pondok Pesantren.
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2 size-4" />
          Tambah Pengguna
        </Button>
      </div>

      <UsersTable />

      <UserFormSheet open={isCreateOpen} onOpenChange={setIsCreateOpen} />
    </div>
  );
}
