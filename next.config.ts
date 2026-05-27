import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Writings 文章封面 / 配圖走 Supabase Storage 的 writings-assets bucket（public read）
    remotePatterns: [
      {
        protocol: "https",
        hostname: "srpqvtkliesdfnqirdpt.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
