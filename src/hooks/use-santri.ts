import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { SANTRI_KEY } from "@/constants/santri-constant";
import { santriService } from "@/services/santri-service";
import {
  createSantriAction,
  updateSantriAction,
  deleteSantriAction,
} from "@/servers/santri";
import type { SantriInput, UpdateSantriInput } from "@/validations/santri-validation";

export function useSantri() {
  return useQuery({
    queryKey: SANTRI_KEY,
    queryFn: santriService.getSantri,
    staleTime: 0,
  });
}

export function useCreateSantri() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SantriInput) => createSantriAction(data),
    onSuccess: () => {
      toast.success("Data santri baru berhasil ditambahkan.");
      queryClient.invalidateQueries({ queryKey: SANTRI_KEY });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Gagal menambahkan santri.");
    },
  });
}

export function useUpdateSantri() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      santriId,
      data,
    }: {
      santriId: string;
      data: UpdateSantriInput;
    }) => updateSantriAction(santriId, data),
    onSuccess: () => {
      toast.success("Data santri berhasil diperbarui.");
      queryClient.invalidateQueries({ queryKey: SANTRI_KEY });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Gagal memperbarui data santri.");
    },
  });
}

export function useDeleteSantri() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (santriId: string) => deleteSantriAction(santriId),
    onSuccess: () => {
      toast.success("Data santri berhasil dihapus.");
      queryClient.invalidateQueries({ queryKey: SANTRI_KEY });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Gagal menghapus santri.");
    },
  });
}
