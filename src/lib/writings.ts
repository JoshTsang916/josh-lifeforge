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
export async function getPublishedWritings(): Promise<Writing[]> {
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
  return (data as Writing[]) ?? [];
}

// 單篇文章頁用 —— 找不到（slug 不存在 / 還是草稿）回傳 null，呼叫端負責 notFound()。
export async function getWritingBySlug(slug: string): Promise<Writing | null> {
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
}
