import { useQuery } from "@tanstack/react-query";
import { teacherService } from "@/services/teacher-service";

export const TEACHER_KEYS = {
  HALAQAH: ["teacher", "halaqah"],
  SANTRI: ["teacher", "santri"],
  SETORAN: ["teacher", "setoran"],
} as const;

export function useTeacherHalaqah() {
  return useQuery({
    queryKey: TEACHER_KEYS.HALAQAH,
    queryFn: teacherService.getHalaqah,
    staleTime: 0,
  });
}

export function useTeacherSantri() {
  return useQuery({
    queryKey: TEACHER_KEYS.SANTRI,
    queryFn: teacherService.getSantri,
    staleTime: 0,
  });
}

export function useTeacherSetoran(params?: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  const page = params?.page || 1;
  const limit = params?.limit || 10;
  const search = params?.search || "";

  return useQuery({
    queryKey: [...TEACHER_KEYS.SETORAN, page, limit, search],
    queryFn: () => teacherService.getSetoranHafalan({ page, limit, search }),
    staleTime: 0,
  });
}
