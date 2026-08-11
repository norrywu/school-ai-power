import api from "@/lib/axios";
import { API_ENDPOINTS } from "@/services/endpoints";
import type { Santri } from "@/db/santri-schema";

export const santriService = {
  getSantri: async (): Promise<Santri[]> => {
    const response = await api.get<{ santri: Santri[] }>(API_ENDPOINTS.ADMIN.SANTRI);
    return response.data.santri || [];
  },
};
