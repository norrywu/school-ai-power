import api from "@/lib/axios";
import { API_ENDPOINTS } from "@/services/endpoints";
import type { Santri } from "@/db/santri-schema";

export type SantriWithKelas = Santri & {
  kelasNama?: string | null;
  kelasTingkat?: string | null;
};

export const santriService = {
  getSantri: async (): Promise<SantriWithKelas[]> => {
    const response = await api.get<{ santri: SantriWithKelas[] }>(
      API_ENDPOINTS.ADMIN.SANTRI
    );
    return response.data.santri || [];
  },
};
