import {
  BookOpenCheck,
  CalendarCheck,
  GraduationCap,
  LayoutDashboard,
  Settings,
  UserCheck,
  UserCog,
} from "lucide-react";

import type { NavItem, NavItemsByRole } from "@/types/navigation";

const adminMenu: NavItem[] = [
  {
    title: "Dasbor",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Santri",
    icon: UserCheck,
    items: [
      { title: "Data Santri", url: "/admin/santri" },
      { title: "Kelas", url: "/admin/classes" },
    ],
  },
  {
    title: "Tahfidz",
    icon: BookOpenCheck,
    items: [
      { title: "Halaqah", url: "/admin/tahfidz/halaqah" },
      { title: "Perkembangan", url: "/admin/tahfidz/progress" },
    ],
  },
  {
    title: "Akademik",
    icon: GraduationCap,
    items: [
      { title: "Mata Pelajaran", url: "/admin/academic/subjects" },
      { title: "Jadwal", url: "/admin/academic/schedule" },
      { title: "Nilai", url: "/admin/academic/grades" },
    ],
  },
  {
    title: "Kehadiran",
    icon: CalendarCheck,
    items: [{ title: "Rekap Kehadiran", url: "/admin/attendance/recap" }],
  },
  {
    title: "Pengguna",
    icon: UserCog,
    url: "/admin/users",
  },
  {
    title: "Pengaturan",
    url: "/admin/settings",
    icon: Settings,
  },
];

const teacherMenu: NavItem[] = [
  {
    title: "Dasbor Pengajar",
    url: "/teacher/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Tahfidz",
    icon: BookOpenCheck,
    items: [
      { title: "Halaqah Saya", url: "/teacher/tahfidz/halaqah" },
      { title: "Input Setoran", url: "/teacher/tahfidz/setoran" },
    ],
  },
  {
    title: "Akademik",
    icon: GraduationCap,
    items: [
      { title: "Jadwal Mengajar", url: "/teacher/academic/schedule" },
      { title: "Input Nilai", url: "/teacher/academic/grades" },
    ],
  },
  {
    title: "Kehadiran",
    icon: CalendarCheck,
    items: [{ title: "Rekap Kehadiran", url: "/teacher/attendance/recap" }],
  },
];

export const navItems: NavItemsByRole = {
  admin: adminMenu,
  teacher: teacherMenu,
};
