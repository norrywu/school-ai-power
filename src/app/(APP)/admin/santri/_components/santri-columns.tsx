import type { DataTableColumn } from "@/components/common/data-table-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JENIS_KELAMIN_LABELS } from "@/constants/santri-constant";
import type { SantriWithRelations } from "@/services/santri-service";
import { Pencil, Trash2 } from "lucide-react";

interface SantriColumnsOptions {
  onEdit?: (santri: SantriWithRelations) => void;
  onDelete?: (santri: SantriWithRelations) => void;
}

export function getSantriColumns({
  onEdit,
  onDelete,
}: SantriColumnsOptions = {}): DataTableColumn<SantriWithRelations>[] {
  return [
    {
      header: "Nama Santri",
      render: (row) => (
        <span className="font-medium text-foreground">{row.nama}</span>
      ),
    },
    {
      header: "Jenis Kelamin",
      render: (row) => {
        const label = JENIS_KELAMIN_LABELS[row.jenisKelamin] || row.jenisKelamin;
        const variant = row.jenisKelamin === "L" ? "default" : "secondary";
        return <Badge variant={variant}>{label}</Badge>;
      },
    },
    {
      header: "Kelas",
      render: (row) => (
        <Badge variant={row.kelasNama ? "outline" : "secondary"}>
          {row.kelasNama
            ? `${row.kelasNama} (${row.kelasTingkat})`
            : "Tanpa Kelas"}
        </Badge>
      ),
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
      header: "Tanggal Terdaftar",
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
              title="Ubah Data Santri"
            >
              <Pencil className="size-4 text-muted-foreground hover:text-foreground" />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onDelete(row)}
              title="Hapus Santri"
            >
              <Trash2 className="size-4 text-destructive hover:text-destructive/80" />
            </Button>
          )}
        </div>
      ),
    },
  ];
}

export const santriColumns = getSantriColumns();
