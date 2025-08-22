// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Poppins, Montserrat } from "next/font/google";
import Shell from "@/components/Shell";

export const metadata: Metadata = {
  title: "SIP CRM",
  description: "Ett minimalistiskt CRM för småföretagare",
};

// Ladda fonter och exponera dem som CSS-variabler
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-montserrat",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
      <body
        className={`${poppins.variable} ${montserrat.variable} min-h-screen bg-neutral-50 text-neutral-900`}
      >
        {/* Shell innehåller topbaren (sök + hamburgare) och sidomenyn */}
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
