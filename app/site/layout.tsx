import type { ReactNode } from "react";
import "@/styles/site-globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange={false}>
      {children}
    </ThemeProvider>
  );
}
