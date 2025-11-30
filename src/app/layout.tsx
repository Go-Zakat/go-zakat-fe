import type { Metadata } from "next";
import {Outfit} from "next/font/google";
import "./globals.css";
import React from "react";

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Go Zakat",
  description: "Ayo berzakat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
        <title>Move…</title>
        <link rel="icon" href="/icons/Mosque.svg" type="image/png" sizes="22x22"  />
    </head>
    <body className={`${outfit.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
