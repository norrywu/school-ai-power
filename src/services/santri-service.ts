import api from "@/lib/axios";
import { API_ENDPOINTS } from "@/services/endpoints";
import type { Santri } from "@/db/santri-schema";

export type SantriWithRelations = Santri & {
  kelasNama?: string | null;
  kelasTingkat?: string | null;
  halaqahNama?: string | null;
};

export const santriService = {
  getSantri: async (): Promise<SantriWithRelations[]> => {
    const response = await api.get<{ santri: SantriWithRelations[] }>(
      API_ENDPOINTS.ADMIN.SANTRI
    );
    return response.data.santri || [];
  },
};
