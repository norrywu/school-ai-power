import api from "@/lib/axios";
import { API_ENDPOINTS } from "@/services/endpoints";
import type { HalaqahWithPembimbing } from "@/services/halaqah-service";
import type { SantriWithRelations } from "@/services/santri-service";
import type { SetoranHafalanResponse } from "@/services/setoran-hafalan-service";

export const teacherService = {
  getHalaqah: async (): Promise<HalaqahWithPembimbing[]> => {
    const response = await api.get<{ halaqah: HalaqahWithPembimbing[] }>(
      API_ENDPOINTS.TEACHER.HALAQAH
    );
    return response.data.halaqah || [];
  },

  getSantri: async (): Promise<SantriWithRelations[]> => {
    const response = await api.get<{ santri: SantriWithRelations[] }>(
      API_ENDPOINTS.TEACHER.SANTRI
    );
    return response.data.santri || [];
  },

  getSetoranHafalan: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<SetoranHafalanResponse> => {
    const response = await api.get<SetoranHafalanResponse>(
      API_ENDPOINTS.TEACHER.SETORAN_HAFALAN,
      { params }
    );
    return response.data;
  },
};
