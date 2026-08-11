import { eq } from "drizzle-orm";
import { auth, db } from "../lib/auth";
import * as schema from "../src/db/auth-schema";
import type { UserRole } from "../src/types/auth-type";

type APIError = {
  message?: string;
  status?: number;
};

async function seed() {
  console.log("🌱 Generating seed data for users...");

  const usersToSeed: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
  }[] = [
    {
      name: "Admin Ponpes",
      email: "admin@ponpes.com",
      password: "password123",
      role: "admin",
    },
    {
      name: "Ustadz Demo",
      email: "demo@ponpes.com",
      password: "password123",
      role: "teacher",
    },
  ];

  for (const user of usersToSeed) {
    try {
      const result = await auth.api.signUpEmail({
        body: {
          email: user.email,
          password: user.password,
          name: user.name,
        },
      });

      // Update role di database secara langsung untuk memastikan nilai role tersimpan
      await db
        .update(schema.user)
        .set({ role: user.role })
        .where(eq(schema.user.id, result.user.id));

      console.log(
        `✅ User berhasil dibuat: ${user.email} | Role: ${user.role} (ID: ${result.user.id})`
      );
    } catch (error: unknown) {
      const err = error as APIError | null;
      const errorMessage =
        err?.message || (error instanceof Error ? error.message : String(error));
      if (errorMessage.toLowerCase().includes("exist") || err?.status === 400) {
        // Jika user sudah ada, pastikan role-nya diperbarui
        const existingUsers = await db
          .select()
          .from(schema.user)
          .where(eq(schema.user.email, user.email));

        if (existingUsers.length > 0 && existingUsers[0]) {
          await db
            .update(schema.user)
            .set({ role: user.role })
            .where(eq(schema.user.id, existingUsers[0].id));
        }

        console.log(`⚠️ User sudah ada (role diperbarui): ${user.email} -> ${user.role}`);
      } else {
        console.error(`❌ Gagal membuat user ${user.email}:`, errorMessage);
      }
    }
  }

  console.log("🎉 Seeding selesai!");
  process.exit(0);
}

seed().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error("💥 Terjadi kesalahan saat seeding:", message);
  process.exit(1);
});
