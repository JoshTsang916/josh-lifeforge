"use server";

import { Resend } from "resend";
import { z } from "zod";

const SERVICE_LABEL: Record<string, string> = {
  workshop: "工作坊",
  consulting: "1 對 1 諮詢",
  speaking: "演講邀約",
  build: "一起把它蓋出來",
};

const ContactSchema = z.object({
  service: z.enum(["workshop", "consulting", "speaking", "build"]),
  email: z.string().email("Email 格式有誤"),
  message: z.string().min(1, "訊息不能空白").max(2000, "訊息太長（上限 2000 字）"),
  // honeypot：bot 會填，真人填了 form 隱藏不到不會填
  company: z.string().max(0).optional().or(z.literal("")),
});

export type ContactState = {
  ok: boolean;
  error?: string;
  fieldErrors?: Partial<Record<"service" | "email" | "message", string>>;
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const raw = {
    service: formData.get("service"),
    email: formData.get("email"),
    message: formData.get("message"),
    company: formData.get("company") ?? "",
  };

  const parsed = ContactSchema.safeParse(raw);

  if (!parsed.success) {
    // honeypot 觸發（bot 填了 company）→ 假裝成功不暴露偵測機制
    if (parsed.error.issues.some((i) => i.path[0] === "company")) {
      return { ok: true };
    }
    const fieldErrors: ContactState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (key === "service" || key === "email" || key === "message") {
        fieldErrors[key] = issue.message;
      }
    }
    return { ok: false, error: "請檢查欄位", fieldErrors };
  }

  const { service, email, message } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, error: "寄件服務暫時不可用，請改寫信給 joshailearing0916@gmail.com" };
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: "人生鍛造所 <onboarding@resend.dev>",
      to: "bonkerser@gmail.com",
      replyTo: email,
      subject: `[人生鍛造所] ${SERVICE_LABEL[service]} — 來自 ${email}`,
      text: [
        `服務：${SERVICE_LABEL[service]}`,
        `Email：${email}`,
        "",
        "訊息：",
        message,
        "",
        "---",
        `送出時間：${new Date().toISOString()}`,
      ].join("\n"),
    });

    if (error) {
      return { ok: false, error: "寄送失敗，請稍後再試或直接寫信給 joshailearing0916@gmail.com" };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: "寄送失敗，請稍後再試或直接寫信給 joshailearing0916@gmail.com" };
  }
}
