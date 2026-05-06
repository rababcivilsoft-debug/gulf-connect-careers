import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Building2, User } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Sign in — Khaleej Careers" }]}),
  component: AuthPage,
});

function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [role, setRole] = useState<"candidate" | "employer">("candidate");
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="container mx-auto max-w-md px-4 py-20">
      <div className="rounded-3xl border border-border bg-card p-8 shadow-elegant">
        <h1 className="font-display text-3xl font-bold text-primary">
          {mode === "signin" ? "Welcome back" : "Create your account"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {mode === "signin" ? "Sign in to continue" : "Join the Gulf talent network"}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-2 rounded-xl bg-muted p-1">
          <button onClick={() => setMode("signup")} className={`rounded-lg py-2 text-sm font-semibold ${mode === "signup" ? "bg-card shadow" : "text-muted-foreground"}`}>Sign up</button>
          <button onClick={() => setMode("signin")} className={`rounded-lg py-2 text-sm font-semibold ${mode === "signin" ? "bg-card shadow" : "text-muted-foreground"}`}>Sign in</button>
        </div>

        {mode === "signup" && (
          <div className="mt-5 grid grid-cols-2 gap-3">
            {[
              { v: "candidate", label: "Job Seeker", icon: User },
              { v: "employer", label: "Employer", icon: Building2 },
            ].map((r) => (
              <button key={r.v} onClick={() => setRole(r.v as typeof role)} className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-sm font-semibold transition ${role === r.v ? "border-gold bg-gold/10 text-primary" : "border-border text-muted-foreground hover:border-muted-foreground"}`}>
                <r.icon className="h-5 w-5" />{r.label}
              </button>
            ))}
          </div>
        )}

        <form className="mt-5 space-y-3" onSubmit={(e) => e.preventDefault()}>
          {mode === "signup" && role === "employer" && (
            <Input label="Company name" placeholder="ACME Holdings LLC" />
          )}
          {mode === "signup" && role === "candidate" && (
            <Input label="Full name" placeholder="Your name" />
          )}
          <Input label="Email" type="email" placeholder="you@example.com" />
          <Input label="Password" type="password" placeholder="••••••••" />
          {mode === "signup" && (
            <label className="flex items-start gap-2 pt-1 text-xs text-muted-foreground">
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5" />
              <span>I agree to the <Link to="/terms" className="text-primary underline">Terms & Conditions</Link> including data privacy and the non-refundable payment policy.</span>
            </label>
          )}
          <button
            disabled={mode === "signup" && !agreed}
            className="mt-2 w-full rounded-md bg-gold-gradient py-3 text-sm font-semibold text-gold-foreground shadow-gold disabled:opacity-50"
          >
            {mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Input({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <input {...rest} className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-gold" />
    </label>
  );
}
