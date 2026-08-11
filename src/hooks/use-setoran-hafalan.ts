import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { SETORAN_HAFALAN_KEY } from "@/constants/setoran-hafalan-constant";
import { setoranHafalanService } from "@/services/setoran-hafalan-service";
import {
  createSetoranHafalanAction,
  updateSetoranHafalanAction,
  deleteSetoranHafalanAction,
} from "@/servers/setoran-hafalan";
import type {
  SetoranHafalanInput,
  UpdateSetoranHafalanInput,
} from "@/validations/setoran-hafalan-validation";

export function useSetoranHafalan(params?: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  const page = params?.page || 1;
  const limit = params?.limit || 10;
  const search = params?.search || "";

  return useQuery({
    queryKey: [...SETORAN_HAFALAN_KEY, page, limit, search],
    queryFn: () => setoranHafalanService.getSetoranHafalan({ page, limit, search }),
    staleTime: 0,
  });
}

export function useCreateSetoranHafalan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SetoranHafalanInput) => createSetoranHafalanAction(data),
    onSuccess: () => {
      toast.success("Setoran hafalan berhasil dicatat.");
      queryClient.invalidateQueries({ queryKey: SETORAN_HAFALAN_KEY });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Gagal mencatat setoran hafalan.");
    },
  });
}

export function useUpdateSetoranHafalan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      setoranId,
      data,
    }: {
      setoranId: string;
      data: UpdateSetoranHafalanInput;
    }) => updateSetoranHafalanAction(setoranId, data),
    onSuccess: () => {
      toast.success("Data setoran hafalan berhasil diperbarui.");
      queryClient.invalidateQueries({ queryKey: SETORAN_HAFALAN_KEY });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Gagal memperbarui setoran hafalan.");
    },
  });
}

export function useDeleteSetoranHafalan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (setoranId: string) => deleteSetoranHafalanAction(setoranId),
    onSuccess: () => {
      toast.success("Data setoran hafalan berhasil dihapus.");
      queryClient.invalidateQueries({ queryKey: SETORAN_HAFALAN_KEY });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Gagal menghapus setoran hafalan.");
    },
  });
}
