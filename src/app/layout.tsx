import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ServiceWorkerRegister } from "@/components/pwa/sw-register";
import { QueryProvider } from "@/components/providers/query-provider";
import { AuthStoreProvider } from "@/components/providers/auth-store-provider";
import { Toaster } from "sonner";
import { getProfile } from "@/servers/profile";

const roboto = Roboto({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pondok Pesantren App",
  description: "Aplikasi Manajemen Pondok Pesantren & Tahfidz",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const user = await getProfile();

  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        roboto.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ServiceWorkerRegister />
          <QueryProvider>
            <AuthStoreProvider user={user}>
              {children}
              <Toaster />
            </AuthStoreProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
