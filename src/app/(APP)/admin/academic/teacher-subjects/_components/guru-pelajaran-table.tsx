"use client";

import { useMemo, useState } from "react";
import { DataTableCard } from "@/components/common/data-table-card";
import type { GuruPelajaranItem } from "@/services/guru-pelajaran-service";
import { useGuruPelajaran } from "@/hooks/use-guru-pelajaran";
import { getGuruPelajaranColumns } from "./guru-pelajaran-columns";
import { GuruPelajaranSkeleton } from "./guru-pelajaran-skeleton";
import { RemoveGuruAssignmentDialog } from "./remove-guru-assignment-dialog";

export function GuruPelajaranTable() {
  const { data: assignments = [], isLoading, error } = useGuruPelajaran();

  const [assignmentToRemove, setAssignmentToRemove] = useState<GuruPelajaranItem | null>(null);
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);

  const handleRemove = (item: GuruPelajaranItem) => {
    setAssignmentToRemove(item);
    setIsRemoveOpen(true);
  };

  const columns = useMemo(
    () =>
      getGuruPelajaranColumns({
        onRemove: handleRemove,
      }),
    []
  );

  if (isLoading) {
    return <GuruPelajaranSkeleton />;
  }

  if (error) {
    return (
      <div className="p-4 text-center text-destructive">
        {(error as Error).message}
      </div>
    );
  }

  return (
    <>
      <DataTableCard<GuruPelajaranItem>
        title="Daftar Penugasan Guru"
        caption="Daftar guru dan mata pelajaran yang diampu."
        columns={columns}
        data={assignments}
        rowKey={(item) => item.id}
        emptyMessage="Belum ada penugasan guru yang terdaftar."
      />

      <RemoveGuruAssignmentDialog
        open={isRemoveOpen}
        onOpenChange={setIsRemoveOpen}
        assignment={assignmentToRemove}
      />
    </>
  );
}
