import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { KELAS_KEY } from "@/constants/kelas-constant";
import { kelasService } from "@/services/kelas-service";
import {
  createKelasAction,
  updateKelasAction,
  deleteKelasAction,
} from "@/servers/kelas";
import type { KelasInput, UpdateKelasInput } from "@/validations/kelas-validation";

export function useKelas() {
  return useQuery({
    queryKey: KELAS_KEY,
    queryFn: kelasService.getKelas,
    staleTime: 0,
  });
}

export function useCreateKelas() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: KelasInput) => createKelasAction(data),
    onSuccess: () => {
      toast.success("Kelas baru berhasil ditambahkan.");
      queryClient.invalidateQueries({ queryKey: KELAS_KEY });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Gagal menambahkan kelas.");
    },
  });
}

export function useUpdateKelas() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      kelasId,
      data,
    }: {
      kelasId: string;
      data: UpdateKelasInput;
    }) => updateKelasAction(kelasId, data),
    onSuccess: () => {
      toast.success("Data kelas berhasil diperbarui.");
      queryClient.invalidateQueries({ queryKey: KELAS_KEY });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Gagal memperbarui data kelas.");
    },
  });
}

export function useDeleteKelas() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (kelasId: string) => deleteKelasAction(kelasId),
    onSuccess: () => {
      toast.success("Data kelas berhasil dihapus.");
      queryClient.invalidateQueries({ queryKey: KELAS_KEY });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Gagal menghapus kelas.");
    },
  });
}
