import api from "@/lib/axios";
import { API_ENDPOINTS } from "@/services/endpoints";
import type { Surah } from "@/db/surah-schema";

export const surahService = {
  getSurah: async (): Promise<Surah[]> => {
    const response = await api.get<{ surah: Surah[] }>(API_ENDPOINTS.SURAH);
    return response.data.surah || [];
  },
};
