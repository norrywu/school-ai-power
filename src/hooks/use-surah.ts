import { useQuery } from "@tanstack/react-query";
import { SURAH_KEY } from "@/constants/setoran-hafalan-constant";
import { surahService } from "@/services/surah-service";

export function useSurah() {
  return useQuery({
    queryKey: SURAH_KEY,
    queryFn: surahService.getSurah,
    staleTime: 1000 * 60 * 60 * 24,
  });
}
