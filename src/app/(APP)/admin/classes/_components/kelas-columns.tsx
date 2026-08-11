import type { DataTableColumn } from "@/components/common/data-table-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Kelas } from "@/db/kelas-schema";
import { Pencil, Trash2 } from "lucide-react";

interface KelasColumnsOptions {
  onEdit?: (kelas: Kelas) => void;
  onDelete?: (kelas: Kelas) => void;
}

export function getKelasColumns({
  onEdit,
  onDelete,
}: KelasColumnsOptions = {}): DataTableColumn<Kelas>[] {
  return [
    {
      header: "Nama Kelas",
      render: (row) => (
        <span className="font-medium text-foreground">{row.nama}</span>
      ),
    },
    {
      header: "Tingkat",
      render: (row) => <Badge variant="outline">{row.tingkat}</Badge>,
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
              title="Ubah Data Kelas"
            >
              <Pencil className="size-4 text-muted-foreground hover:text-foreground" />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onDelete(row)}
              title="Hapus Kelas"
            >
              <Trash2 className="size-4 text-destructive hover:text-destructive/80" />
            </Button>
          )}
        </div>
      ),
    },
  ];
}

export const kelasColumns = getKelasColumns();
