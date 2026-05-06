import type { Metadata } from "next";
import {
  Noto_Serif_TC,
  Noto_Sans_TC,
  Outfit,
  Huninn,
  LXGW_WenKai_TC,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

// === Main brand pair (v0.3) ===
const notoSerifTC = Noto_Serif_TC({
  variable: "--font-noto-serif-tc",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const notoSansTC = Noto_Sans_TC({
  variable: "--font-noto-sans-tc",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

// === Latin UI font ===
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// === Playground / alternates ===
const huninn = Huninn({
  variable: "--font-huninn",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const lxgwWenKaiTC = LXGW_WenKai_TC({
  variable: "--font-lxgw-wenkai-tc",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

const SITE_URL = "https://josh0916.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "人生鍛造所 — Josh Tsang",
  description:
    "用對話建系統。把 AI 鍛造成你的第二曲線。Josh — 高中數學老師 × AI 創作者。工作坊、1 對 1 諮詢、演講邀約。",
  openGraph: {
    title: "人生鍛造所 — Josh Tsang",
    description: "用對話建系統。把 AI 鍛造成你的第二曲線。",
    url: SITE_URL,
    type: "website",
    locale: "zh_TW",
    siteName: "人生鍛造所",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Josh 帶領 n8n Automation Workshop 結業現場",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "人生鍛造所 — Josh Tsang",
    description: "用對話建系統。把 AI 鍛造成你的第二曲線。",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-TW"
      className={[
        notoSerifTC.variable,
        notoSansTC.variable,
        outfit.variable,
        huninn.variable,
        lxgwWenKaiTC.variable,
      ].join(" ")}
    >
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
