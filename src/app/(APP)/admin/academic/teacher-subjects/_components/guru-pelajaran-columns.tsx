import type { DataTableColumn } from "@/components/common/data-table-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { GuruPelajaranItem } from "@/services/guru-pelajaran-service";
import { Trash2 } from "lucide-react";

interface GuruPelajaranColumnsOptions {
  onRemove?: (item: GuruPelajaranItem) => void;
}

export function getGuruPelajaranColumns({
  onRemove,
}: GuruPelajaranColumnsOptions = {}): DataTableColumn<GuruPelajaranItem>[] {
  return [
    {
      header: "Nama Pengajar / Guru",
      render: (row) => (
        <div className="flex flex-col">
          <span className="font-medium text-foreground">{row.guruName || "Tanpa Nama"}</span>
          <span className="text-xs text-muted-foreground">{row.guruEmail || "-"}</span>
        </div>
      ),
    },
    {
      header: "Mata Pelajaran",
      render: (row) => (
        <div className="flex items-center gap-2">
          {row.mataPelajaranKode && (
            <Badge variant="outline" className="font-mono">
              {row.mataPelajaranKode}
            </Badge>
          )}
          <span className="font-medium">{row.mataPelajaranNama || "-"}</span>
        </div>
      ),
    },
    {
      header: "Tanggal Penugasan",
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
          {onRemove && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onRemove(row)}
              title="Hapus Penugasan Guru"
            >
              <Trash2 className="size-4 text-destructive hover:text-destructive/80" />
            </Button>
          )}
        </div>
      ),
    },
  ];
}

export const guruPelajaranColumns = getGuruPelajaranColumns();
