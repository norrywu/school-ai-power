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
    url: "/APP/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Santri",
    icon: UserCheck,
    items: [
      { title: "Data Santri", url: "/APP/admin/students" },
      { title: "Kelas", url: "/APP/admin/classes" },
    ],
  },
  {
    title: "Tahfidz",
    icon: BookOpenCheck,
    items: [
      { title: "Halaqah", url: "/APP/admin/tahfidz/halaqah" },
      { title: "Setoran", url: "/APP/admin/tahfidz/setoran" },
      { title: "Perkembangan", url: "/APP/admin/tahfidz/progress" },
    ],
  },
  {
    title: "Akademik",
    icon: GraduationCap,
    items: [
      { title: "Mata Pelajaran", url: "/APP/admin/academic/subjects" },
      { title: "Jadwal", url: "/APP/admin/academic/schedule" },
      { title: "Nilai", url: "/APP/admin/academic/grades" },
    ],
  },
  {
    title: "Kehadiran",
    icon: CalendarCheck,
    items: [
      { title: "Rekap Kehadiran", url: "/APP/admin/attendance/recap" },
    ],
  },
  {
    title: "Pengguna",
    icon: UserCog,
    items: [
      { title: "Guru/Ustadz", url: "/APP/admin/users/teachers" },
      { title: "Admin", url: "/APP/admin/users/admins" },
    ],
  },
  {
    title: "Pengaturan",
    url: "/APP/admin/settings",
    icon: Settings,
  },
];

const teacherMenu: NavItem[] = [
  {
    title: "Dasbor Pengajar",
    url: "/APP/teacher/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Tahfidz",
    icon: BookOpenCheck,
    items: [
      { title: "Halaqah Saya", url: "/APP/teacher/tahfidz/halaqah" },
      { title: "Input Setoran", url: "/APP/teacher/tahfidz/setoran" },
    ],
  },
  {
    title: "Akademik",
    icon: GraduationCap,
    items: [
      { title: "Jadwal Mengajar", url: "/APP/teacher/academic/schedule" },
      { title: "Input Nilai", url: "/APP/teacher/academic/grades" },
    ],
  },
  {
    title: "Kehadiran",
    icon: CalendarCheck,
    items: [
      { title: "Rekap Kehadiran", url: "/APP/teacher/attendance/recap" },
    ],
  },
];

export const navItems: NavItemsByRole = {
  admin: adminMenu,
  teacher: teacherMenu,
};
