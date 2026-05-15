import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AssetFlow — AI Agent Media Showcase",
  description:
    "The Universal Media Router for AI Video Agents. Discover, preview, and copy Agent prompts for HeyGen, ElevenLabs, and Ideogram assets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">{children}</body>
    </html>
  );
}
