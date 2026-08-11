import type { DataTableColumn } from "@/components/common/data-table-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { HalaqahWithPembimbing } from "@/services/halaqah-service";
import { Pencil, Trash2 } from "lucide-react";

interface HalaqahColumnsOptions {
  onEdit?: (halaqah: HalaqahWithPembimbing) => void;
  onDelete?: (halaqah: HalaqahWithPembimbing) => void;
}

export function getHalaqahColumns({
  onEdit,
  onDelete,
}: HalaqahColumnsOptions = {}): DataTableColumn<HalaqahWithPembimbing>[] {
  return [
    {
      header: "Nama Halaqah",
      render: (row) => (
        <span className="font-medium text-foreground">{row.nama}</span>
      ),
    },
    {
      header: "Pembimbing (Ustadz)",
      render: (row) => (
        <Badge variant={row.pembimbingNama ? "outline" : "secondary"}>
          {row.pembimbingNama || "Belum Ada Pembimbing"}
        </Badge>
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
              title="Ubah Data Halaqah"
            >
              <Pencil className="size-4 text-muted-foreground hover:text-foreground" />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onDelete(row)}
              title="Hapus Halaqah"
            >
              <Trash2 className="size-4 text-destructive hover:text-destructive/80" />
            </Button>
          )}
        </div>
      ),
    },
  ];
}

export const halaqahColumns = getHalaqahColumns();
