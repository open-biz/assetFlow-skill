import type { Metadata } from "next";
import "./globals.css";

const OG_IMAGE =
  "https://raw.githubusercontent.com/open-biz/assetFlow-skill/main/assetflow_cover.svg";

export const metadata: Metadata = {
  title: "AssetFlow — AI Agent Media Showcase",
  description:
    "The Universal Asset Router for AI Video Agents. Discover, preview, and deploy AI-generated assets directly into your Hyperframes workflow.",
  openGraph: {
    title: "AssetFlow — AI Agent Media Showcase",
    description:
      "The Universal Asset Router for AI Video Agents. Discover, preview, and deploy AI-generated assets directly into your Hyperframes workflow.",
    type: "website",
    url: "https://github.com/open-biz/assetFlow-skill",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "AssetFlow — Universal Asset Router for AI Video Agents",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AssetFlow — AI Agent Media Showcase",
    description:
      "The Universal Asset Router for AI Video Agents. Discover, preview, and deploy AI-generated assets directly into your Hyperframes workflow.",
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;600;700&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen font-body">{children}</body>
    </html>
  );
}
