import type { Metadata } from "next";
import {
  Noto_Serif_TC,
  Outfit,
  LXGW_WenKai_TC,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { VercelToolbar } from "@vercel/toolbar/next";
import "./globals.css";

// === Main brand pair (v0.5): Noto Serif TC (display, 思源宋) + LXGW WenKai TC (body, 霞鶩文楷) ===
// /fonts playground 用的 Noto Sans TC + Huninn 不掛在 root html，
// 已搬進 src/app/fonts/page.tsx 自行 scope —— 避免主站 preload 沒用的字型 CSS
const notoSerifTC = Noto_Serif_TC({
  variable: "--font-noto-serif-tc",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const lxgwWenKaiTC = LXGW_WenKai_TC({
  variable: "--font-lxgw-wenkai-tc",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

// === Latin UI font ===
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL = "https://josh0916.com";

// Tagline used as og:title / twitter title — manifesto 風格，呼應 hero 三元素
const TAGLINE = "閱讀 × AI × 時間 ＝ 鍛造人生";

// Description 同步用於 SEO / og / twitter — 把 hero 三元素 + 「駕馭 AI」融進去
const DESCRIPTION =
  "AI 給你槓桿，閱讀給你底氣，時間給你自由。Josh 教你駕馭 AI、讀更深、活得不急。工作坊 / 1 對 1 諮詢 / 演講邀約。";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "人生鍛造所 — Josh Tsang",
  description: DESCRIPTION,
  openGraph: {
    title: TAGLINE,
    description: DESCRIPTION,
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
    title: TAGLINE,
    description: DESCRIPTION,
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
        lxgwWenKaiTC.variable,
        outfit.variable,
      ].join(" ")}
    >
      <body>
        {children}
        <Analytics />
        {process.env.VERCEL_ENV === "preview" && <VercelToolbar />}
      </body>
    </html>
  );
}
