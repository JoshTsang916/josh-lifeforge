import type { Metadata } from "next";
import { Newsreader, Outfit } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "人生鍛造所 — Josh Tsang",
  description:
    "用對話建系統。把 AI 鍛造成你的第二曲線。Josh — 高中數學老師 × AI 創作者。工作坊、1 對 1 諮詢、演講邀約。",
  openGraph: {
    title: "人生鍛造所 — Josh Tsang",
    description: "用對話建系統。把 AI 鍛造成你的第二曲線。",
    type: "website",
    locale: "zh_TW",
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
      className={`${newsreader.variable} ${outfit.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
