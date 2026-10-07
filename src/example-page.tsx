import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { ratePresentation, listRatings } from "@/lib/rating.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Presentation Rating AI — Backend Test" },
      { name: "description", content: "Upload PDF or PowerPoint slides and get an AI score with feedback." },
      { property: "og:title", content: "Presentation Rating AI" },
      { property: "og:description", content: "Upload slides and get an AI score with feedback." },
    ],
  }),
  component: Index,
});

type Rating = Awaited<ReturnType<typeof listRatings>>[number];

function Index() {
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);
  return (
    <main className="mx-auto max-w-2xl p-6 space-y-6">
      <h1 className="text-2xl font-bold">Presentation Rating AI — backend test</h1>
      {session ? <App email={session.user.email ?? ""} /> : <Auth />}
    </main>
  );
}

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const go = async (signup: boolean) => {
    setMsg("");
    const { error, data } = signup
      ? await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin } })
      : await supabase.auth.signInWithPassword({ email, password });
    if (error) setMsg(error.message);
    else if (signup && !data.session) setMsg("Check your email to confirm your account.");
  };
  return (
    <div className="space-y-2">
      <input className="w-full rounded border border-input p-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="w-full rounded border border-input p-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <div className="flex gap-2">
        <button className="rounded bg-primary px-4 py-2 text-primary-foreground" onClick={() => go(false)}>Log in</button>
        <button className="rounded border border-input px-4 py-2" onClick={() => go(true)}>Sign up</button>
      </div>
      {msg && <p className="text-sm text-muted-foreground">{msg}</p>}
    </div>
  );
}

function App({ email }: { email: string }) {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const load = () => listRatings().then(setRatings).catch((e) => setErr(e.message));
  useEffect(() => { load(); }, []);

  const upload = async (file: File) => {
    setErr(""); setBusy(true);
    try {
      const { data: u } = await supabase.auth.getUser();
      const path = `${u.user!.id}/${crypto.randomUUID()}-${file.name}`;
      const { error } = await supabase.storage.from("presentations").upload(path, file);
      if (error) throw error;
      await ratePresentation({ data: { filePath: path, fileName: file.name } });
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed");
    } finally {
      setBusy(false); load();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <span>{email}</span>
        <button className="underline" onClick={() => supabase.auth.signOut()}>Log out</button>
      </div>
      <input type="file" accept=".pdf,.pptx" disabled={busy} onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
      {busy && <p>Rating your slides…</p>}
      {err && <p className="text-destructive">{err}</p>}
      {ratings.map((r) => (
        <div key={r.id} className="rounded border border-border p-4 space-y-1">
          <div className="flex justify-between font-semibold">
            <span>{r.file_name}</span>
            <span>{r.status === "done" ? `${r.overall_score}/100` : r.status}</span>
          </div>
          {r.summary && <p className="text-sm">{r.summary}</p>}
          {r.error && <p className="text-sm text-destructive">{r.error}</p>}
        </div>
      ))}
    </div>
  );
}
