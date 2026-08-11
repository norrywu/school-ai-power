import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { USERS_KEY } from "@/constants/users-constant";
import { userService } from "@/services/user-service";
import { createUserAction, updateUserAction, deleteUserAction } from "@/servers/users";
import type { UserInput } from "@/validations/users-validation";

export function useUsers() {
  return useQuery({
    queryKey: USERS_KEY,
    queryFn: userService.getUsers,
    staleTime: 0,
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UserInput) => createUserAction(data),
    onSuccess: () => {
      toast.success("Pengguna baru berhasil ditambahkan.");
      queryClient.invalidateQueries({ queryKey: USERS_KEY });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Gagal menambahkan pengguna.");
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: Partial<UserInput> }) =>
      updateUserAction(userId, data),
    onSuccess: () => {
      toast.success("Data pengguna berhasil diperbarui.");
      queryClient.invalidateQueries({ queryKey: USERS_KEY });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Gagal memperbarui pengguna.");
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => deleteUserAction(userId),
    onSuccess: () => {
      toast.success("Pengguna berhasil dihapus.");
      queryClient.invalidateQueries({ queryKey: USERS_KEY });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Gagal menghapus pengguna.");
    },
  });
}
