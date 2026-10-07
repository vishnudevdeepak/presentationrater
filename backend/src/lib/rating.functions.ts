import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/** Rate an uploaded deck. File must already be in the `presentations` bucket under `<userId>/...`. */
export const ratePresentation = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z.object({ filePath: z.string().min(1), fileName: z.string().min(1).max(255) }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    if (!data.filePath.startsWith(`${userId}/`)) throw new Error("Invalid file path");
    if (!/\.(pdf|pptx)$/i.test(data.fileName)) throw new Error("Only PDF or PPTX files are supported");

    const { data: row, error: insErr } = await supabase
      .from("ratings")
      .insert({ user_id: userId, file_path: data.filePath, file_name: data.fileName })
      .select()
      .single();
    if (insErr) throw new Error(insErr.message);

    try {
      const { data: blob, error: dlErr } = await supabase.storage
        .from("presentations")
        .download(data.filePath);
      if (dlErr || !blob) throw new Error(dlErr?.message ?? "File not found");

      const apiKey = process.env["LOVABLE_API_KEY"];
      if (!apiKey) throw new Error("AI is not configured");
      const { rateWithAI } = await import("./rating.server");
      const result = await rateWithAI(apiKey, data.fileName, await blob.arrayBuffer());

      const { data: updated, error: upErr } = await supabase
        .from("ratings")
        .update({ status: "done", ...result })
        .eq("id", row.id)
        .select()
        .single();
      if (upErr) throw new Error(upErr.message);
      return updated;
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Rating failed";
      await supabase.from("ratings").update({ status: "error", error: msg }).eq("id", row.id);
      throw new Error(msg);
    }
  });

export const listRatings = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("ratings")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  });

export const deleteRating = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { data: row } = await context.supabase
      .from("ratings").select("file_path").eq("id", data.id).single();
    if (row) await context.supabase.storage.from("presentations").remove([row.file_path]);
    const { error } = await context.supabase.from("ratings").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
