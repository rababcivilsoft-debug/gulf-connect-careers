import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Sparkles, Lock, MapPin, Briefcase, GraduationCap, Wallet, CheckCircle2 } from "lucide-react";
import { CANDIDATES, applyFilters, parseQuery, type Filters } from "../lib/candidates";

export const Route = createFileRoute("/employers")({
  head: () => ({ meta: [
    { title: "For Employers — Khaleej Careers" },
    { name: "description", content: "Search verified Gulf candidates with AI-powered natural language search." },
  ]}),
  component: EmployersPage,
});

function EmployersPage() {
  const [nl, setNl] = useState("");
  const [filters, setFilters] = useState<Filters>({});
  const [unlocked, setUnlocked] = useState<Record<string, boolean>>({});
  const [paying, setPaying] = useState<string | null>(null);

  const results = useMemo(() => applyFilters(CANDIDATES, filters), [filters]);

  const runAI = () => setFilters(parseQuery(nl));

  const unlock = (id: string) => {
    setPaying(id);
    setTimeout(() => {
      setUnlocked((u) => ({ ...u, [id]: true }));
      setPaying(null);
    }, 900);
  };

  return (
    <div>
      <section className="bg-hero-gradient py-16 text-primary-foreground">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Employer Portal</div>
          <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">Find your next hire in seconds</h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/80">Type what you need in plain English or Arabic. Our AI translates it into precise filters across 12,000+ Gulf candidates.</p>

          <div className="mt-8 rounded-2xl border border-gold/30 bg-primary-foreground/5 p-2 backdrop-blur">
            <div className="flex flex-col gap-2 md:flex-row">
              <div className="flex flex-1 items-center gap-3 rounded-xl bg-background px-4 py-3 text-foreground">
                <Sparkles className="h-5 w-5 text-gold" />
                <input
                  value={nl}
                  onChange={(e) => setNl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && runAI()}
                  placeholder='Try: "Female accountant in Riyadh with 3 years experience"'
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
              <button onClick={runAI} className="rounded-xl bg-gold-gradient px-6 py-3 text-sm font-semibold text-gold-foreground shadow-gold">
                Smart Search
              </button>
            </div>
          </div>

          {Object.keys(filters).length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              {Object.entries(filters).map(([k, v]) => (
                <span key={k} className="rounded-full bg-gold/20 px-3 py-1 text-gold">
                  {k}: <strong>{String(v)}</strong>
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="container mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[280px_1fr]">
        {/* Filters */}
        <aside className="h-fit rounded-2xl border border-border bg-card p-5">
          <h3 className="font-display text-lg font-semibold text-primary">Refine</h3>
          <div className="mt-4 space-y-4 text-sm">
            <Field label="Job title">
              <input value={filters.title ?? ""} onChange={(e) => setFilters({ ...filters, title: e.target.value || undefined })} className="input" placeholder="e.g. accountant" />
            </Field>
            <Field label="City">
              <input value={filters.city ?? ""} onChange={(e) => setFilters({ ...filters, city: e.target.value || undefined })} className="input" placeholder="e.g. Dubai" />
            </Field>
            <Field label="Gender">
              <select value={filters.gender ?? ""} onChange={(e) => setFilters({ ...filters, gender: (e.target.value || undefined) as Filters["gender"] })} className="input">
                <option value="">Any</option><option>Male</option><option>Female</option>
              </select>
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Age min"><input type="number" className="input" value={filters.ageMin ?? ""} onChange={(e) => setFilters({ ...filters, ageMin: +e.target.value || undefined })} /></Field>
              <Field label="Age max"><input type="number" className="input" value={filters.ageMax ?? ""} onChange={(e) => setFilters({ ...filters, ageMax: +e.target.value || undefined })} /></Field>
            </div>
            <Field label="Min experience (yrs)">
              <input type="number" className="input" value={filters.experienceMin ?? ""} onChange={(e) => setFilters({ ...filters, experienceMin: +e.target.value || undefined })} />
            </Field>
            <Field label="Max salary (AED)">
              <input type="number" className="input" value={filters.salaryMax ?? ""} onChange={(e) => setFilters({ ...filters, salaryMax: +e.target.value || undefined })} />
            </Field>
            <button onClick={() => { setFilters({}); setNl(""); }} className="w-full rounded-md border border-border px-3 py-2 text-xs font-medium hover:bg-muted">
              Clear all
            </button>
          </div>
          <style>{`.input{width:100%;border:1px solid var(--border);background:var(--background);border-radius:8px;padding:8px 10px;font-size:13px;outline:none}.input:focus{border-color:var(--gold)}`}</style>
        </aside>

        {/* Results */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{results.length} candidates match your search</p>
            <span className="text-xs text-muted-foreground">Unlock full profile · <strong className="text-gold">5 AED</strong></span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {results.map((c) => {
              const isUnlocked = !!unlocked[c.id];
              return (
                <div key={c.id} className="rounded-2xl border border-border bg-card p-5 transition-all hover:shadow-elegant">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gold-gradient font-display text-lg font-bold text-gold-foreground shadow-gold">
                      {c.initials}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-display text-lg font-semibold text-primary">{c.title}</h3>
                        <CheckCircle2 className="h-4 w-4 text-gold" />
                      </div>
                      <div className="text-xs text-muted-foreground">{c.gender} · {c.age} yrs · {c.nationality}</div>
                      <div className="mt-3 grid grid-cols-2 gap-y-1.5 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {c.city}, {c.country}</span>
                        <span className="flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5" /> {c.experience} yrs exp</span>
                        <span className="flex items-center gap-1.5"><Wallet className="h-3.5 w-3.5" /> {c.salary.toLocaleString()} AED</span>
                        <span className="flex items-center gap-1.5"><GraduationCap className="h-3.5 w-3.5" /> {c.education}</span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {c.skills.slice(0, isUnlocked ? 99 : 2).map((s) => (
                          <span key={s} className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-secondary-foreground">{s}</span>
                        ))}
                        {!isUnlocked && c.skills.length > 2 && <span className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] text-muted-foreground">+{c.skills.length - 2} more</span>}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 border-t border-border pt-4">
                    {isUnlocked ? (
                      <div className="rounded-lg bg-secondary/60 p-3 text-sm">
                        <div className="font-semibold text-primary">Contact unlocked</div>
                        <div className="mt-1 text-xs text-muted-foreground">📧 candidate.{c.id}@khaleej.demo · 📱 +971 5X XXX 1234</div>
                      </div>
                    ) : (
                      <button
                        onClick={() => unlock(c.id)}
                        disabled={paying === c.id}
                        className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
                      >
                        <Lock className="h-4 w-4" />
                        {paying === c.id ? "Processing payment..." : "Unlock full profile · 5 AED"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {results.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
              No candidates match those filters. Try widening your search.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
