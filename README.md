# Presentation Rating AI — Backend

Backend for rating PDF/PPTX slide decks with AI. Built for TanStack Start + Lovable Cloud (Supabase).

## Files

- `src/lib/rating.functions.ts` — server functions: `ratePresentation`, `listRatings`, `deleteRating`
- `src/lib/rating.server.ts` — AI call (Lovable AI Gateway) + PPTX text extraction
- `src/integrations/supabase/*` — Supabase clients and auth middleware
- `src/example-page.tsx` — working example page (auth + upload + rating list)

## Database setup (run this SQL once)

```sql
create table public.ratings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  file_path text not null,
  file_name text not null,
  status text not null default 'processing',
  overall_score integer,
  scores jsonb,
  summary text,
  strengths text[],
  improvements text[],
  error text,
  created_at timestamptz not null default now()
);

alter table public.ratings enable row level security;

create policy "users read own ratings" on public.ratings
  for select using (auth.uid() = user_id);
create policy "users insert own ratings" on public.ratings
  for insert with check (auth.uid() = user_id);
create policy "users delete own ratings" on public.ratings
  for delete using (auth.uid() = user_id);
```

## Storage setup

Create a **private** bucket named `presentations`, then add these policies on `storage.objects`:

```sql
create policy "users upload own files" on storage.objects
  for insert with check (bucket_id = 'presentations' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "users read own files" on storage.objects
  for select using (bucket_id = 'presentations' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "users delete own files" on storage.objects
  for delete using (bucket_id = 'presentations' and (storage.foldername(name))[1] = auth.uid()::text);
```

## Usage

1. Upload the file to the `presentations` bucket at `<userId>/<file>` (see `example-page.tsx`).
2. Call `ratePresentation({ data: { filePath, fileName } })`.
3. Call `listRatings()` to show history, `deleteRating({ data: { id } })` to remove.

Requires `LOVABLE_API_KEY` server env var for the AI call, and the Supabase
auth middleware registered as `functionMiddleware` in `src/start.ts`.
Dependency: `jszip`.
