import api from "@/lib/axios";
import { API_ENDPOINTS } from "@/services/endpoints";
import type { SetoranHafalan } from "@/db/setoran-hafalan-schema";

export type SetoranHafalanWithRelations = SetoranHafalan & {
  santriNama?: string | null;
  halaqahNama?: string | null;
  surahNama?: string | null;
  surahNomor?: number | null;
};

export type PaginationMeta = {
  page: number;
  limit: number;
  totalRecords: number;
  totalPages: number;
};

export type SetoranHafalanResponse = {
  setoranHafalan: SetoranHafalanWithRelations[];
  pagination: PaginationMeta;
};

export const setoranHafalanService = {
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
