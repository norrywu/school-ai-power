import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { HALAQAH_KEY } from "@/constants/halaqah-constant";
import { SANTRI_KEY } from "@/constants/santri-constant";
import { halaqahService } from "@/services/halaqah-service";
import {
  createHalaqahAction,
  updateHalaqahAction,
  deleteHalaqahAction,
  assignSantriToHalaqahAction,
} from "@/servers/halaqah";
import type {
  HalaqahInput,
  UpdateHalaqahInput,
} from "@/validations/halaqah-validation";

export function useHalaqah() {
  return useQuery({
    queryKey: HALAQAH_KEY,
    queryFn: halaqahService.getHalaqah,
    staleTime: 0,
  });
}

export function useCreateHalaqah() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: HalaqahInput) => createHalaqahAction(data),
    onSuccess: () => {
      toast.success("Halaqah baru berhasil ditambahkan.");
      queryClient.invalidateQueries({ queryKey: HALAQAH_KEY });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Gagal menambahkan halaqah.");
    },
  });
}

export function useUpdateHalaqah() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      halaqahId,
      data,
    }: {
      halaqahId: string;
      data: UpdateHalaqahInput;
    }) => updateHalaqahAction(halaqahId, data),
    onSuccess: () => {
      toast.success("Data halaqah berhasil diperbarui.");
      queryClient.invalidateQueries({ queryKey: HALAQAH_KEY });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Gagal memperbarui data halaqah.");
    },
  });
}

export function useDeleteHalaqah() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (halaqahId: string) => deleteHalaqahAction(halaqahId),
    onSuccess: () => {
      toast.success("Data halaqah berhasil dihapus.");
      queryClient.invalidateQueries({ queryKey: HALAQAH_KEY });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Gagal menghapus halaqah.");
    },
  });
}

export function useAssignSantriToHalaqah() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      halaqahId,
      santriIds,
    }: {
      halaqahId: string;
      santriIds: string[];
    }) => assignSantriToHalaqahAction(halaqahId, santriIds),
    onSuccess: () => {
      toast.success("Daftar anggota santri halaqah berhasil disimpan.");
      queryClient.invalidateQueries({ queryKey: HALAQAH_KEY });
      queryClient.invalidateQueries({ queryKey: SANTRI_KEY });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Gagal menyimpan anggota halaqah.");
    },
  });
}
