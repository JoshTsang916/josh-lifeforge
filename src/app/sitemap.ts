import type { MetadataRoute } from "next";

const SITE_URL = "https://josh0916.com";

export default function sitemap(): MetadataRoute.Sitemap {
  // 故意不放 lastModified —— 每次 build 都 new Date() 會讓 Googlebot 看到頻繁
  // 跳動但內容沒變，長期失去參考價值。等 /writings/[slug] 上線後，個別
  // article 才放實際 published_at 當 lastModified
  return [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
