import api from "@/lib/axios";
import { API_ENDPOINTS } from "@/services/endpoints";

export interface GuruPelajaranItem {
  id: string;
  guruId: string;
  guruName: string | null;
  guruEmail: string | null;
  mataPelajaranId: string;
  mataPelajaranNama: string | null;
  mataPelajaranKode: string | null;
  createdAt: Date;
}

export const guruPelajaranService = {
  getGuruPelajaran: async (): Promise<GuruPelajaranItem[]> => {
    const response = await api.get<{ guruPelajaran: GuruPelajaranItem[] }>(
      API_ENDPOINTS.ADMIN.GURU_PELAJARAN
    );
    return response.data.guruPelajaran || [];
  },
};
