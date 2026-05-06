import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Upload, Sparkles, CheckCircle2, FileText } from "lucide-react";

export const Route = createFileRoute("/candidates")({
  head: () => ({ meta: [
    { title: "For Candidates — Khaleej Careers" },
    { name: "description", content: "Upload your CV. AI builds your profile in seconds." },
  ]}),
  component: CandidatesPage,
});

type Profile = {
  fullName: string; dob: string; nationality: string;
  email: string; phone: string; city: string;
  title: string; experience: string; education: string;
  skills: string; salary: string; preferredJobs: string;
};

const SAMPLE: Profile = {
  fullName: "Aisha Al-Mansoori", dob: "1996-04-12", nationality: "Emirati",
  email: "aisha.almansoori@example.ae", phone: "+971 50 123 4567", city: "Dubai",
  title: "Marketing Specialist", experience: "5 years",
  education: "BA Marketing — UAE University, 2018",
  skills: "Social Media, Branding, Google Ads, Arabic & English",
  salary: "14,000 AED", preferredJobs: "Marketing Manager, Brand Lead",
};

function CandidatesPage() {
  const [step, setStep] = useState<"upload" | "parsing" | "review">("upload");
  const [fileName, setFileName] = useState("");
  const [profile, setProfile] = useState<Profile>(SAMPLE);
  const [saved, setSaved] = useState(false);

  const onFile = (f: File) => {
    setFileName(f.name);
    setStep("parsing");
    setTimeout(() => setStep("review"), 1800);
  };

  return (
    <div>
      <section className="bg-hero-gradient py-16 text-primary-foreground">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Candidate Portal</div>
          <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">Upload once. Get discovered everywhere.</h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/80">Drop your CV or passport — our AI extracts your skills, experience, and credentials so employers find you instantly.</p>
        </div>
      </section>

      <section className="container mx-auto max-w-5xl px-4 py-14">
        <Stepper step={step} />

        {step === "upload" && (
          <div className="mt-10 rounded-3xl border-2 border-dashed border-border bg-card p-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-gradient text-gold-foreground shadow-gold">
              <Upload className="h-7 w-7" />
            </div>
            <h2 className="mt-5 font-display text-2xl font-bold text-primary">Upload your CV or passport</h2>
            <p className="mt-2 text-sm text-muted-foreground">PDF, DOCX, JPG · Max 10MB</p>
            <label className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              <Upload className="h-4 w-4" /> Choose file
              <input type="file" hidden accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
            </label>
            <button onClick={() => onFile(new File([""], "demo-cv.pdf"))} className="ml-3 mt-6 inline-flex rounded-md border border-border px-6 py-3 text-sm font-semibold hover:bg-muted">
              Try with sample CV
            </button>
          </div>
        )}

        {step === "parsing" && (
          <div className="mt-10 rounded-3xl border border-border bg-card p-12 text-center">
            <div className="mx-auto flex h-16 w-16 animate-pulse items-center justify-center rounded-2xl bg-gold-gradient text-gold-foreground shadow-gold">
              <Sparkles className="h-7 w-7" />
            </div>
            <h2 className="mt-5 font-display text-2xl font-bold text-primary">AI is reading your CV…</h2>
            <p className="mt-2 text-sm text-muted-foreground">Extracting name, skills, experience, education and more from <strong>{fileName}</strong></p>
            <div className="mx-auto mt-6 h-1.5 w-64 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-1/2 animate-[loading_1.5s_ease-in-out_infinite] bg-gold-gradient" />
            </div>
            <style>{`@keyframes loading{0%{margin-left:-50%}100%{margin-left:100%}}`}</style>
          </div>
        )}

        {step === "review" && (
          <div className="mt-10">
            <div className="mb-4 flex items-center gap-2 rounded-lg border border-gold/40 bg-gold/10 p-3 text-sm">
              <CheckCircle2 className="h-4 w-4 text-gold" />
              <span><strong>Extraction complete.</strong> Review and edit your profile before publishing.</span>
            </div>
            <div className="rounded-3xl border border-border bg-card p-8 shadow-elegant">
              <div className="flex items-center gap-4 border-b border-border pb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-gradient font-display text-xl font-bold text-gold-foreground shadow-gold">
                  {profile.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-primary">{profile.fullName}</h3>
                  <p className="text-sm text-muted-foreground">{profile.title} · {profile.city}</p>
                </div>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {Object.entries({
                  fullName: "Full name", dob: "Date of birth", nationality: "Nationality",
                  email: "Email", phone: "Phone", city: "Preferred city",
                  title: "Current/latest title", experience: "Experience",
                  education: "Education", skills: "Skills",
                  salary: "Expected salary", preferredJobs: "Preferred jobs",
                }).map(([key, label]) => (
                  <label key={key} className="block">
                    <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
                    <input
                      value={profile[key as keyof Profile]}
                      onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-gold"
                    />
                  </label>
                ))}
              </div>
              <div className="mt-8 flex items-center justify-between">
                <button onClick={() => setStep("upload")} className="text-sm text-muted-foreground hover:text-foreground">
                  ← Upload different file
                </button>
                <button onClick={() => setSaved(true)} className="rounded-md bg-gold-gradient px-6 py-3 text-sm font-semibold text-gold-foreground shadow-gold">
                  {saved ? "✓ Profile published" : "Publish my profile"}
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function Stepper({ step }: { step: "upload" | "parsing" | "review" }) {
  const steps = [
    { id: "upload", label: "Upload CV", icon: Upload },
    { id: "parsing", label: "AI parsing", icon: Sparkles },
    { id: "review", label: "Review & publish", icon: FileText },
  ] as const;
  const idx = steps.findIndex((s) => s.id === step);
  return (
    <div className="flex items-center justify-center gap-3">
      {steps.map((s, i) => (
        <div key={s.id} className="flex items-center gap-3">
          <div className={`flex h-9 w-9 items-center justify-center rounded-full border-2 ${i <= idx ? "border-gold bg-gold-gradient text-gold-foreground" : "border-border bg-card text-muted-foreground"}`}>
            <s.icon className="h-4 w-4" />
          </div>
          <span className={`text-sm font-medium ${i <= idx ? "text-primary" : "text-muted-foreground"}`}>{s.label}</span>
          {i < steps.length - 1 && <div className={`h-px w-12 ${i < idx ? "bg-gold" : "bg-border"}`} />}
        </div>
      ))}
    </div>
  );
}
