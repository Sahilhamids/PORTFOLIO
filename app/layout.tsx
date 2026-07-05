import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";
import CommandPalette from "./components/CommandPalette";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://sahilhamids-portfolio.vercel.app"),
  title: "Sahil Hamid Shaikh | Backend Engineer",
  description: "Portfolio of Sahil Hamid Shaikh, Backend Engineer specializing in Python, FastAPI, AI-powered apps, and full-stack development.",
  openGraph: {
    title: "Sahil Hamid Shaikh | Backend Engineer",
    description: "Portfolio of Sahil Hamid Shaikh, Backend Engineer specializing in Python, FastAPI, AI-powered apps, and full-stack development.",
    url: "https://sahilhamids-portfolio.vercel.app",
    siteName: "Sahil Hamid Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/api/og-screenshot",
        width: 1200,
        height: 630,
        alt: "Sahil Hamid Shaikh Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sahil Hamid Shaikh | Backend Engineer",
    description: "Portfolio of Sahil Hamid Shaikh, Backend Engineer specializing in Python, FastAPI, AI-powered apps, and full-stack development.",
    images: ["/api/og-screenshot"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className={`${inter.className} min-h-full`}>
        <CustomCursor />
        <CommandPalette />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
