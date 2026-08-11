import { UsersTable } from "./_components/users-table";

export default function UsersPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Daftar Pengguna</h2>
          <p className="text-sm text-muted-foreground">
            Kelola data akun pengguna dan peran di lingkungan Pondok Pesantren.
          </p>
        </div>
      </div>

      <UsersTable />
    </div>
  );
}
