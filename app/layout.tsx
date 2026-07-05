import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";
import CommandPalette from "./components/CommandPalette";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-sahilhamids.vercel.app"),
  title: "Sahil Hamid Shaikh | Full-Stack Engineer",
  description: "Portfolio of Sahil Hamid Shaikh, AI & Backend Engineer specializing in Python, FastAPI, and full-stack development.",
  openGraph: {
    title: "Sahil Hamid Shaikh | Full-Stack Engineer",
    description: "Portfolio of Sahil Hamid Shaikh, AI & Backend Engineer specializing in Python, FastAPI, and full-stack development.",
    url: "https://portfolio-sahilhamids.vercel.app",
    siteName: "Sahil Hamid Portfolio",
    images: [
      {
        url: "/images/hero/photo1.jpg", // Using the airport photo as default OG image
        width: 1200,
        height: 630,
        alt: "Sahil Hamid Shaikh Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sahil Hamid Shaikh | Full-Stack Engineer",
    description: "Portfolio of Sahil Hamid Shaikh, AI & Backend Engineer specializing in Python, FastAPI, and full-stack development.",
    images: ["/images/hero/photo1.jpg"],
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
