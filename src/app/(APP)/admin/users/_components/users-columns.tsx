import type { DataTableColumn } from "@/components/common/data-table-card";
import { Badge } from "@/components/ui/badge";
import { ROLE_LABELS } from "@/constants/users-constant";
import type { AuthUser } from "@/types/auth-type";

export const usersColumns: DataTableColumn<AuthUser>[] = [
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
];
