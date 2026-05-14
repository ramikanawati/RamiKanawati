import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains"
});

export const metadata: Metadata = {
  title: "Rami Kanawati — Tech Lead & Full-Stack Engineer",
  description:
    "Rami Kanawati — Tech Lead & Co-founder of Makkinni LLC. Full-stack engineer building production React/Next.js, React Native, and .NET systems. Architect of autonomous AI agents on local and frontier LLMs.",
  metadataBase: new URL("https://ramikanawati.com"),
  openGraph: {
    title: "Rami Kanawati — Tech Lead & Full-Stack Engineer",
    description:
      "Building production-grade web, mobile, and AI agent systems across the UK and UAE.",
    type: "website"
  }
};

export const viewport: Viewport = {
  themeColor: "#05060a",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
