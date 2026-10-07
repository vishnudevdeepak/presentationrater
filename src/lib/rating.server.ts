import JSZip from "jszip";

export const RATING_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["overall_score", "scores", "summary", "strengths", "improvements"],
  properties: {
    overall_score: { type: "integer", description: "0-100" },
    scores: {
      type: "object",
      additionalProperties: false,
      required: ["content", "structure", "design", "clarity", "engagement"],
      properties: {
        content: { type: "integer" },
        structure: { type: "integer" },
        design: { type: "integer" },
        clarity: { type: "integer" },
        engagement: { type: "integer" },
      },
    },
    summary: { type: "string" },
    strengths: { type: "array", items: { type: "string" } },
    improvements: { type: "array", items: { type: "string" } },
  },
} as const;

export type RatingResult = {
  overall_score: number;
  scores: Record<string, number>;
  summary: string;
  strengths: string[];
  improvements: string[];
};

const PROMPT =
  "You are an expert presentation coach. Rate this slide deck. Score each category 0-100 " +
  "(content, structure, design, clarity, engagement) and give an overall score 0-100. " +
  "Write a 2-3 sentence summary, 3-5 strengths and 3-5 specific improvements.";

export async function extractPptxText(bytes: ArrayBuffer): Promise<string> {
  const zip = await JSZip.loadAsync(bytes);
  const slides = Object.keys(zip.files)
    .filter((n) => /^ppt\/slides\/slide\d+\.xml$/.test(n))
    .sort((a, b) => Number(a.match(/\d+/)![0]) - Number(b.match(/\d+/)![0]));
  const out: string[] = [];
  for (const [i, name] of slides.entries()) {
    const xml = (await zip.file(name)?.async("string")) ?? "";
    const text = [...xml.matchAll(/<a:t>([^<]*)<\/a:t>/g)].map((m) => m[1]).join(" ");
    out.push(`Slide ${i + 1}: ${text}`);
  }
  return out.join("\n");
}

function toBase64(bytes: ArrayBuffer) {
  const arr = new Uint8Array(bytes);
  let s = "";
  for (let i = 0; i < arr.length; i += 0x8000) s += String.fromCharCode(...arr.subarray(i, i + 0x8000));
  return btoa(s);
}

export async function rateWithAI(
  apiKey: string,
  fileName: string,
  bytes: ArrayBuffer,
): Promise<RatingResult> {
  const isPdf = fileName.toLowerCase().endsWith(".pdf");
  const content: Record<string, unknown>[] = [{ type: "input_text", text: PROMPT }];
  if (isPdf) {
    content.push({
      type: "input_file",
      filename: fileName,
      file_data: `data:application/pdf;base64,${toBase64(bytes)}`,
    });
  } else {
    const text = await extractPptxText(bytes);
    if (!text.trim()) throw new Error("No text found in the slides.");
    content.push({ type: "input_text", text: `Slide text:\n${text.slice(0, 100000)}` });
  }

  const res = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Lovable-API-Key": apiKey,
      "X-Lovable-AIG-SDK": "fetch",
    },
    body: JSON.stringify({
      model: "openai/gpt-6-astra",
      input: [{ role: "user", content }],
      stream: true,
      store: false,
      reasoning: { effort: "low" },
      text: { format: { type: "json_schema", name: "rating", strict: true, schema: RATING_SCHEMA } },
    }),
  });
  if (!res.ok || !res.body) {
    const body = await res.text().catch(() => "");
    const err = new Error(
      res.status === 402
        ? "AI credits exhausted. Please add credits."
        : res.status === 429
          ? "Too many requests, try again shortly."
          : `AI request failed (${res.status}): ${body.slice(0, 200)}`,
    );
    throw err;
  }

  // Consume SSE stream server-side
  const reader = res.body.getReader();
  const dec = new TextDecoder();
  let buf = "";
  let text = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    const lines = buf.split("\n");
    buf = lines.pop() ?? "";
    for (const line of lines) {
      if (!line.startsWith("data:")) continue;
      const data = line.slice(5).trim();
      if (!data || data === "[DONE]") continue;
      try {
        const ev = JSON.parse(data);
        if (ev.type === "response.output_text.delta") text += ev.delta;
        if (ev.type === "response.failed" || ev.type === "error")
          throw new Error(ev.response?.error?.message ?? ev.message ?? "AI failed");
      } catch (e) {
        if (e instanceof SyntaxError) continue;
        throw e;
      }
    }
  }
  if (!text) throw new Error("AI returned no result.");
  return JSON.parse(text) as RatingResult;
}
