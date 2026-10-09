import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { MATA_PELAJARAN_KEY } from "@/constants/mata-pelajaran-constant";
import { mataPelajaranService } from "@/services/mata-pelajaran-service";
import {
  createMataPelajaranAction,
  updateMataPelajaranAction,
  deleteMataPelajaranAction,
} from "@/servers/mata-pelajaran";
import type {
  MataPelajaranInput,
  UpdateMataPelajaranInput,
} from "@/validations/mata-pelajaran-validation";

export function useMataPelajaran() {
  return useQuery({
    queryKey: MATA_PELAJARAN_KEY,
    queryFn: mataPelajaranService.getMataPelajaran,
    staleTime: 0,
  });
}

export function useCreateMataPelajaran() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MataPelajaranInput) => createMataPelajaranAction(data),
    onSuccess: () => {
      toast.success("Mata pelajaran baru berhasil ditambahkan.");
      queryClient.invalidateQueries({ queryKey: MATA_PELAJARAN_KEY });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Gagal menambahkan mata pelajaran.");
    },
  });
}

export function useUpdateMataPelajaran() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateMataPelajaranInput;
    }) => updateMataPelajaranAction(id, data),
    onSuccess: () => {
      toast.success("Data mata pelajaran berhasil diperbarui.");
      queryClient.invalidateQueries({ queryKey: MATA_PELAJARAN_KEY });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Gagal memperbarui mata pelajaran.");
    },
  });
}

export function useDeleteMataPelajaran() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteMataPelajaranAction(id),
    onSuccess: () => {
      toast.success("Mata pelajaran berhasil dihapus.");
      queryClient.invalidateQueries({ queryKey: MATA_PELAJARAN_KEY });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Gagal menghapus mata pelajaran.");
    },
  });
}
