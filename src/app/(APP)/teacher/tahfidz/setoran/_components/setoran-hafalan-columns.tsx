import type { DataTableColumn } from "@/components/common/data-table-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JENIS_SETORAN_LABELS } from "@/constants/setoran-hafalan-constant";
import type { SetoranHafalanWithRelations } from "@/services/setoran-hafalan-service";
import { Pencil, Trash2 } from "lucide-react";

interface SetoranHafalanColumnsOptions {
  onEdit?: (setoran: SetoranHafalanWithRelations) => void;
  onDelete?: (setoran: SetoranHafalanWithRelations) => void;
}

export function getSetoranHafalanColumns({
  onEdit,
  onDelete,
}: SetoranHafalanColumnsOptions = {}): DataTableColumn<SetoranHafalanWithRelations>[] {
  return [
    {
      header: "Nama Santri",
      render: (row) => (
        <span className="font-medium text-foreground">{row.santriNama || "—"}</span>
      ),
    },
    {
      header: "Surah & Ayat",
      render: (row) => (
        <div className="flex flex-col">
          <span className="font-medium">
            {row.surahNomor ? `${row.surahNomor}. ` : ""}{row.surahNama || "—"}
          </span>
          <span className="text-xs text-muted-foreground">
            Ayat {row.ayatMulai} - {row.ayatSelesai}
          </span>
        </div>
      ),
    },
    {
      header: "Jenis",
      render: (row) => {
        const label = JENIS_SETORAN_LABELS[row.jenis] || row.jenis;
        const variant = row.jenis === "ziyadah" ? "default" : "secondary";
        return <Badge variant={variant}>{label}</Badge>;
      },
    },
    {
      header: "Halaqah",
      render: (row) => (
        <Badge variant={row.halaqahNama ? "outline" : "secondary"}>
          {row.halaqahNama || "Tanpa Halaqah"}
        </Badge>
      ),
    },
    {
      header: "Nilai",
      render: (row) => (
        <Badge variant="outline" className="font-semibold">
          {row.nilai || "-"}
        </Badge>
      ),
    },
    {
      header: "Catatan Pembimbing",
      render: (row) => (
        <span
          className="text-xs text-muted-foreground italic line-clamp-2 max-w-[200px]"
          title={row.catatan || undefined}
        >
          {row.catatan || "—"}
        </span>
      ),
    },
    {
      header: "Tanggal Setoran",
      render: (row) => (
        <span className="text-muted-foreground">
          {new Date(row.tanggal).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
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
              title="Ubah Setoran Hafalan"
            >
              <Pencil className="size-4 text-muted-foreground hover:text-foreground" />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onDelete(row)}
              title="Hapus Setoran Hafalan"
            >
              <Trash2 className="size-4 text-destructive hover:text-destructive/80" />
            </Button>
          )}
        </div>
      ),
    },
  ];
}

export const setoranHafalanColumns = getSetoranHafalanColumns();
