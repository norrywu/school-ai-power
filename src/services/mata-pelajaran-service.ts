import api from "@/lib/axios";
import { API_ENDPOINTS } from "@/services/endpoints";
import type { MataPelajaran } from "@/db/mata-pelajaran-schema";

export const mataPelajaranService = {
  getMataPelajaran: async (): Promise<MataPelajaran[]> => {
    const response = await api.get<{ mataPelajaran: MataPelajaran[] }>(
      API_ENDPOINTS.ADMIN.MATA_PELAJARAN
    );
    return response.data.mataPelajaran || [];
  },
};
