import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { GURU_PELAJARAN_KEY } from "@/constants/guru-pelajaran-constant";
import { guruPelajaranService } from "@/services/guru-pelajaran-service";
import {
  assignGuruPelajaranAction,
  removeGuruPelajaranAction,
} from "@/servers/guru-pelajaran";
import type { GuruPelajaranInput } from "@/validations/guru-pelajaran-validation";

export function useGuruPelajaran() {
  return useQuery({
    queryKey: GURU_PELAJARAN_KEY,
    queryFn: guruPelajaranService.getGuruPelajaran,
    staleTime: 0,
  });
}

export function useAssignGuruPelajaran() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: GuruPelajaranInput) => assignGuruPelajaranAction(data),
    onSuccess: () => {
      toast.success("Guru berhasil ditugaskan mengajar mata pelajaran.");
      queryClient.invalidateQueries({ queryKey: GURU_PELAJARAN_KEY });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Gagal menugaskan guru.");
    },
  });
}

export function useRemoveGuruPelajaran() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (assignmentId: string) => removeGuruPelajaranAction(assignmentId),
    onSuccess: () => {
      toast.success("Penugasan guru berhasil dihapus.");
      queryClient.invalidateQueries({ queryKey: GURU_PELAJARAN_KEY });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Gagal menghapus penugasan guru.");
    },
  });
}
