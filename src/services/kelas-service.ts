import api from "@/lib/axios";
import { API_ENDPOINTS } from "@/services/endpoints";
import type { Kelas } from "@/db/kelas-schema";

export const kelasService = {
  getKelas: async (): Promise<Kelas[]> => {
    const response = await api.get<{ kelas: Kelas[] }>(API_ENDPOINTS.ADMIN.CLASSES);
    return response.data.kelas || [];
  },
};
