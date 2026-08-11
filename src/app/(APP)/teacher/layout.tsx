import { requireTeacher } from "@/lib/auth-guard";

export default async function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireTeacher();

  return <>{children}</>;
}
