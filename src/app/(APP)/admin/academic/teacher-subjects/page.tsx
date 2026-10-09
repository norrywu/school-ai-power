"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GuruPelajaranTable } from "./_components/guru-pelajaran-table";
import { AssignGuruFormSheet } from "./_components/assign-guru-form-sheet";

export default function TeacherSubjectsPage() {
  const [isAssignOpen, setIsAssignOpen] = useState(false);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Penugasan Guru Mapel</h2>
          <p className="text-sm text-muted-foreground">
            Kelola penugasan guru pengampu untuk setiap mata pelajaran.
          </p>
        </div>
        <Button onClick={() => setIsAssignOpen(true)}>
          <Plus className="mr-2 size-4" />
          Tugaskan Guru
        </Button>
      </div>

      <GuruPelajaranTable />

      <AssignGuruFormSheet open={isAssignOpen} onOpenChange={setIsAssignOpen} />
    </div>
  );
}
