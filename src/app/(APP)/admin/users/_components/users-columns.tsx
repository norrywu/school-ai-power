import type { DataTableColumn } from "@/components/common/data-table-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ROLE_LABELS } from "@/constants/users-constant";
import type { AuthUser } from "@/types/auth-type";
import { Pencil, Trash2 } from "lucide-react";

interface UsersColumnsOptions {
  onEdit?: (user: AuthUser) => void;
  onDelete?: (user: AuthUser) => void;
}

export function getUsersColumns({
  onEdit,
  onDelete,
}: UsersColumnsOptions = {}): DataTableColumn<AuthUser>[] {
  return [
    {
      header: "Nama Pengguna",
      render: (user) => (
        <span className="font-medium text-foreground">
          {user.name || "Tanpa Nama"}
        </span>
      ),
    },
    {
      header: "Email",
      render: (user) => (
        <span className="text-muted-foreground">{user.email || "-"}</span>
      ),
    },
    {
      header: "Peran (Role)",
      render: (user) => {
        const label = user.role ? ROLE_LABELS[user.role] || user.role : "Belum Diatur";
        const variant = user.role === "admin" ? "default" : "secondary";
        return <Badge variant={variant}>{label}</Badge>;
      },
    },
    {
      header: "Aksi",
      cellClassName: "text-right",
      headClassName: "text-right",
      render: (user) => (
        <div className="flex items-center justify-end gap-2">
          {onEdit && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onEdit(user)}
              title="Ubah Pengguna"
            >
              <Pencil className="size-4 text-muted-foreground hover:text-foreground" />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onDelete(user)}
              title="Hapus Pengguna"
            >
              <Trash2 className="size-4 text-destructive hover:text-destructive/80" />
            </Button>
          )}
        </div>
      ),
    },
  ];
}

export const usersColumns = getUsersColumns();
