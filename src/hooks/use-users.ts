import { useQuery } from "@tanstack/react-query";
import { USERS_KEY } from "@/constants/users-constant";
import { userService } from "@/services/user-service";

export function useUsers() {
  return useQuery({
    queryKey: USERS_KEY,
    queryFn: userService.getUsers,
    staleTime: 60 * 1000,
  });
}
