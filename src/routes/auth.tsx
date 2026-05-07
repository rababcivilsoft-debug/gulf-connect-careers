import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Building2, User } from "lucide-react";
import { login, registerCandidate, registerEmployer } from "../lib/auth";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Sign in - Khaleej Careers" }]}),
  component: AuthPage,
});

function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [role, setRole] = useState<"candidate" | "employer">("candidate");
  const [agreed, setAgreed] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "signup" && !agreed) return;

    setError("");
    setIsSubmitting(true);

    try {
      const trimmedPhone = phoneNumber.trim() || undefined;

      if (mode === "signin") {
        const session = await login({ email, password });
        navigate({ to: session?.user?.role === "employer" ? "/employers" : "/candidates" });
        return;
      }

      const session = role === "employer"
        ? await registerEmployer({
            companyName,
            contactName,
            email,
            password,
            phoneNumber: trimmedPhone,
          })
        : await registerCandidate({
            fullName,
            email,
            password,
            phoneNumber: trimmedPhone,
          });

      navigate({ to: session?.user?.role === "employer" ? "/employers" : "/candidates" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <button type="button" onClick={() => setMode("signup")} className={`rounded-lg py-2 text-sm font-semibold ${mode === "signup" ? "bg-card shadow" : "text-muted-foreground"}`}>Sign up</button>
          <button type="button" onClick={() => setMode("signin")} className={`rounded-lg py-2 text-sm font-semibold ${mode === "signin" ? "bg-card shadow" : "text-muted-foreground"}`}>Sign in</button>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          {[
            { v: "candidate", label: "Job Seeker", icon: User },
            { v: "employer", label: "Employer", icon: Building2 },
          ].map((r) => (
            <button key={r.v} type="button" onClick={() => setRole(r.v as typeof role)} className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-sm font-semibold transition ${role === r.v ? "border-gold bg-gold/10 text-primary" : "border-border text-muted-foreground hover:border-muted-foreground"}`}>
              <r.icon className="h-5 w-5" />{r.label}
            </button>
          ))}
        </div>

        <form className="mt-5 space-y-3" onSubmit={handleSubmit}>
          {mode === "signup" && role === "employer" && (
            <>
              <Input label="Company name" placeholder="ACME Holdings LLC" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
              <Input label="Contact name" placeholder="Hiring manager name" value={contactName} onChange={(e) => setContactName(e.target.value)} required />
            </>
          )}
          {mode === "signup" && role === "candidate" && (
            <Input label="Full name" placeholder="Your name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          )}
          <Input label="Email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input label="Password" type="password" placeholder="Password123!" value={password} onChange={(e) => setPassword(e.target.value)} minLength={8} required />
          {mode === "signup" && (
            <Input label="Phone number" type="tel" placeholder="+201000000001" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          )}
          {mode === "signup" && (
            <label className="flex items-start gap-2 pt-1 text-xs text-muted-foreground">
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5" />
              <span>I agree to the <Link to="/terms" className="text-primary underline">Terms & Conditions</Link> including data privacy and the non-refundable payment policy.</span>
            </label>
          )}
          {error && (
            <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </div>
          )}
          <button
            disabled={isSubmitting || (mode === "signup" && !agreed)}
            className="mt-2 w-full rounded-md bg-gold-gradient py-3 text-sm font-semibold text-gold-foreground shadow-gold disabled:opacity-50"
          >
            {isSubmitting ? "Please wait..." : mode === "signin" ? "Sign in" : "Create account"}
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
