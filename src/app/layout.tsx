import type {Metadata} from "next";
import {Outfit} from "next/font/google";
import "./globals.css";
import React from "react";
import {ThemeProvider} from "@/src/shared/ui/ThemeProvider";

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
        <html lang="en" suppressHydrationWarning>
            <head>
                <title>Move…</title>

                {/* TODO Gunakan href="icons/Mosque.svg" jika masih tahap dev */}
                <link rel="icon" href="/go-zakat/icons/Mosque.svg" type="image/png" sizes="22x22"/>

            </head>
            <body className={`${outfit.variable} antialiased `}>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
