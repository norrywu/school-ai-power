import { auth } from "../lib/auth";

type APIError = {
  message?: string;
  status?: number;
};

async function seed() {
  console.log("🌱 Generating seed data for users...");

  const usersToSeed = [
    {
      name: "Admin Ponpes",
      email: "admin@ponpes.com",
      password: "password123",
    },
    {
      name: "User Demo",
      email: "demo@ponpes.com",
      password: "password123",
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
      console.log(`✅ User berhasil dibuat: ${user.email} (ID: ${result.user.id})`);
    } catch (error: unknown) {
      const err = error as APIError | null;
      const errorMessage =
        err?.message || (error instanceof Error ? error.message : String(error));
      if (errorMessage.toLowerCase().includes("exist") || err?.status === 400) {
        console.log(`⚠️ User sudah ada: ${user.email}`);
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
