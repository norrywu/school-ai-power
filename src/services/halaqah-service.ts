import api from "@/lib/axios";
import { API_ENDPOINTS } from "@/services/endpoints";
import type { Halaqah } from "@/db/halaqah-schema";

export type HalaqahWithPembimbing = Halaqah & {
  pembimbingNama?: string | null;
  pembimbingEmail?: string | null;
  totalSantri?: number;
};

export const halaqahService = {
  getHalaqah: async (): Promise<HalaqahWithPembimbing[]> => {
    const response = await api.get<{ halaqah: HalaqahWithPembimbing[] }>(
      API_ENDPOINTS.ADMIN.HALAQAH
    );
    return response.data.halaqah || [];
  },
};
