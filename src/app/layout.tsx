import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "GestorOnline - Gestão de Tráfego Pago Inteligente",
  description:
    "Plataforma completa para gestão de tráfego pago. Integração Meta Ads e Google Ads, dashboards em tempo real, alertas inteligentes e muito mais.",
  keywords: "gestão de tráfego, meta ads, google ads, marketing digital, saas",
  openGraph: {
    title: "GestorOnline - Gestão de Tráfego Pago Inteligente",
    description:
      "Plataforma completa para gestão de tráfego pago. Integração Meta Ads e Google Ads, dashboards em tempo real, alertas inteligentes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
