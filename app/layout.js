import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Outfit } from "next/font/google";
import Provider from "./provider";
import { ClerkProvider } from "@clerk/nextjs";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Brevio - AI-Powered PDF Note Taking",
  description:
    "Transform your PDFs into smart notes with AI-powered analysis and intelligent summaries.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={outfit.className}>
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
