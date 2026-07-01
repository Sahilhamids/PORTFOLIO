import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sahil Hamid Shaikh — AI & Backend Engineer",
  description: "Portfolio of Sahil Hamid Shaikh, AI & Backend Engineer specializing in Python, FastAPI, and full-stack development.",
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
        {children}
      </body>
    </html>
  );
}
