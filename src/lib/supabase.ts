import "server-only";
import { createClient } from "@supabase/supabase-js";

// Writings 區塊用的 read-only Supabase client（shared instance JoshSTT）。
// 只在 server component / route handler 端使用，不暴露給瀏覽器。
// 沒設環境變數時回傳 null —— 讓呼叫端優雅 fallback 到空狀態，
// 而不是讓整個頁面在 build / preview 時 crash（preview 環境預設沒設 Supabase 變數，見 TODO.md 🟢#10）。
const url = process.env.SUPABASE_URL;
const anonKey = process.env.SUPABASE_ANON_KEY;

export const supabase =
  url && anonKey
    ? createClient(url, anonKey, {
        auth: { persistSession: false },
      })
    : null;
