import "server-only";
import { cache } from "react";
import { supabase } from "./supabase";

// 對應 Supabase public.writings 表（見 supabase migration create_writings_table）
export type Writing = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body_md: string;
  cover_image_url: string | null;
  status: "draft" | "published";
  published_at: string | null;
  tags: string[];
  reading_time: number | null;
};

// 列表頁用 —— 已發佈文章，依 published_at 由新到舊。
// 注意：RLS policy 本身已限定 anon 只能讀 status = 'published'，
// 這裡再 .eq() 一次是為了讓意圖在程式碼裡也看得見（雙保險、零成本）。
// 用 React.cache() 包起來：同一次 render 內多次呼叫只打一次 Supabase。
export const getPublishedWritings = cache(async (): Promise<Writing[]> => {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("writings")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error) {
    console.error("[writings] getPublishedWritings failed:", error.message);
    return [];
  }
  return (data as Writing[] | null) ?? [];
});

// 單篇文章頁用 —— 找不到（slug 不存在 / 還是草稿）回傳 null，呼叫端負責 notFound()。
// cache() 讓 generateMetadata 和頁面 component 共用同一次查詢結果（同 render 週期）。
export const getWritingBySlug = cache(async (slug: string): Promise<Writing | null> => {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("writings")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  if (error) {
    console.error("[writings] getWritingBySlug failed:", error.message);
    return null;
  }
  return (data as Writing | null) ?? null;
});

// published_at（ISO 字串）→ 2026.05.12；解析不出來回 null（呼叫端負責隱藏）
export function formatDate(iso: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}
