import type { DataTableColumn } from "@/components/common/data-table-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { MataPelajaran } from "@/db/mata-pelajaran-schema";
import { Pencil, Trash2 } from "lucide-react";

interface MataPelajaranColumnsOptions {
  onEdit?: (mapel: MataPelajaran) => void;
  onDelete?: (mapel: MataPelajaran) => void;
}

export function getMataPelajaranColumns({
  onEdit,
  onDelete,
}: MataPelajaranColumnsOptions = {}): DataTableColumn<MataPelajaran>[] {
  return [
    {
      header: "Kode",
      render: (row) => <Badge variant="outline" className="font-mono">{row.kode}</Badge>,
    },
    {
      header: "Nama Mata Pelajaran",
      render: (row) => (
        <span className="font-medium text-foreground">{row.nama}</span>
      ),
    },
    {
      header: "Tanggal Dibuat",
      render: (row) => (
        <span className="text-muted-foreground">
          {new Date(row.createdAt).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
      ),
    },
    {
      header: "Aksi",
      cellClassName: "text-right",
      headClassName: "text-right",
      render: (row) => (
        <div className="flex items-center justify-end gap-2">
          {onEdit && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onEdit(row)}
              title="Ubah Mata Pelajaran"
            >
              <Pencil className="size-4 text-muted-foreground hover:text-foreground" />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onDelete(row)}
              title="Hapus Mata Pelajaran"
            >
              <Trash2 className="size-4 text-destructive hover:text-destructive/80" />
            </Button>
          )}
        </div>
      ),
    },
  ];
}

export const mataPelajaranColumns = getMataPelajaranColumns();
