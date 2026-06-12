import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { CustomCursor, NoiseOverlay } from "@/src/components/ui/MagneticCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alex Carter | Visual Engineer & Full-Stack Developer",
  description: "A stunning, interactive developer portfolio showcasing bleeding-edge web technologies, visual designs, and systems architecture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
      <body className="antialiased bg-black text-neutral-200">
        <NoiseOverlay />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
