import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Building2, CheckCircle2, Save } from "lucide-react";
import { RoleGuard } from "../components/site/RoleGuard";

export const Route = createFileRoute("/company-profile")({
  head: () => ({
    meta: [
      { title: "Company Profile — Khaleej Careers" },
      { name: "description", content: "Create and manage your company profile on Khaleej Careers." },
    ],
  }),
  component: () => <RoleGuard role="employer"><CompanyProfilePage /></RoleGuard>,
});

const STORAGE_KEY = "kc_company_profile";

type CompanyProfile = {
  name: string;
  industry: string;
  manufactureYear: string;
  turnover: string;
  employees: string;
  country: string;
  city: string;
  website: string;
  email: string;
  phone: string;
  size: string;
  license: string;
  description: string;
};

const EMPTY: CompanyProfile = {
  name: "", industry: "", manufactureYear: "", turnover: "", employees: "",
  country: "", city: "", website: "", email: "", phone: "", size: "",
  license: "", description: "",
};

const INDUSTRIES = ["Oil & Gas", "Banking & Finance", "Construction", "Healthcare", "Information Technology", "Hospitality", "Retail", "Logistics", "Education", "Real Estate", "Manufacturing", "Government"];
const COUNTRIES = ["United Arab Emirates", "Saudi Arabia", "Kuwait", "Qatar", "Bahrain", "Oman"];
const SIZES = ["1–10", "11–50", "51–200", "201–500", "501–1000", "1000+"];
const TURNOVERS = ["< 1M AED", "1M – 10M AED", "10M – 50M AED", "50M – 250M AED", "250M – 1B AED", "> 1B AED"];

function CompanyProfilePage() {
  const [data, setData] = useState<CompanyProfile>(EMPTY);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setData({ ...EMPTY, ...JSON.parse(raw) });
    } catch {}
  }, []);

  const set = <K extends keyof CompanyProfile>(k: K, v: CompanyProfile[K]) => setData((d) => ({ ...d, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  return (
    <div>
      <section className="bg-hero-gradient py-14 text-primary-foreground">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Employer Portal</div>
          <h1 className="mt-3 flex items-center gap-3 font-display text-4xl font-bold md:text-5xl">
            <Building2 className="h-9 w-9 text-gold" /> Company Profile
          </h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/80">
            Complete your company information so candidates can recognize and trust your brand.
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-5xl px-4 py-12">
        <form onSubmit={submit} className="space-y-10">
          <Section title="Basic Information" subtitle="Public details that appear on your company page.">
            <Grid>
              <Field label="Company name" required>
                <input required value={data.name} onChange={(e) => set("name", e.target.value)} className="input" placeholder="e.g. Al Madar Holdings" />
              </Field>
              <Field label="Industry" required>
                <select required value={data.industry} onChange={(e) => set("industry", e.target.value)} className="input">
                  <option value="">Select industry</option>
                  {INDUSTRIES.map((i) => <option key={i}>{i}</option>)}
                </select>
              </Field>
              <Field label="Year of establishment" required>
                <select required value={data.manufactureYear} onChange={(e) => set("manufactureYear", e.target.value)} className="input">
                  <option value="">Select year</option>
                  {years.map((y) => <option key={y}>{y}</option>)}
                </select>
              </Field>
              <Field label="Trade license / CR number">
                <input value={data.license} onChange={(e) => set("license", e.target.value)} className="input" placeholder="e.g. CN-1234567" />
              </Field>
            </Grid>
          </Section>

          <Section title="Company Size & Financials">
            <Grid>
              <Field label="Number of employees" required>
                <input required type="number" min={1} value={data.employees} onChange={(e) => set("employees", e.target.value)} className="input" placeholder="e.g. 250" />
              </Field>
              <Field label="Company size band">
                <select value={data.size} onChange={(e) => set("size", e.target.value)} className="input">
                  <option value="">Select size</option>
                  {SIZES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </Field>
              <Field label="Annual turnover">
                <select value={data.turnover} onChange={(e) => set("turnover", e.target.value)} className="input">
                  <option value="">Select turnover range</option>
                  {TURNOVERS.map((t) => <option key={t}>{t}</option>)}
                </select>
              </Field>
            </Grid>
          </Section>

          <Section title="Headquarters">
            <Grid>
              <Field label="Country" required>
                <select required value={data.country} onChange={(e) => set("country", e.target.value)} className="input">
                  <option value="">Select country</option>
                  {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="City" required>
                <input required value={data.city} onChange={(e) => set("city", e.target.value)} className="input" placeholder="e.g. Dubai" />
              </Field>
            </Grid>
          </Section>

          <Section title="Contact">
            <Grid>
              <Field label="Website">
                <input type="url" value={data.website} onChange={(e) => set("website", e.target.value)} className="input" placeholder="https://" />
              </Field>
              <Field label="Public email" required>
                <input required type="email" value={data.email} onChange={(e) => set("email", e.target.value)} className="input" placeholder="hr@company.com" />
              </Field>
              <Field label="Phone">
                <input value={data.phone} onChange={(e) => set("phone", e.target.value)} className="input" placeholder="+971 ..." />
              </Field>
            </Grid>
          </Section>

          <Section title="About">
            <Field label="Company description">
              <textarea
                rows={5}
                value={data.description}
                onChange={(e) => set("description", e.target.value)}
                className="input"
                placeholder="Tell candidates what your company does, its mission and culture."
              />
            </Field>
          </Section>

          <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button type="button" onClick={() => navigate({ to: "/employers" })} className="rounded-md border border-border px-5 py-2.5 text-sm font-medium hover:bg-muted">
              Back to portal
            </button>
            <div className="flex items-center gap-3">
              {saved && (
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gold">
                  <CheckCircle2 className="h-4 w-4" /> Profile saved
                </span>
              )}
              <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-md bg-gold-gradient px-6 py-2.5 text-sm font-semibold text-gold-foreground shadow-gold">
                <Save className="h-4 w-4" /> Save profile
              </button>
            </div>
          </div>
        </form>
        <style>{`.input{width:100%;border:1px solid var(--border);background:var(--background);border-radius:8px;padding:10px 12px;font-size:14px;outline:none;color:var(--foreground)}.input:focus{border-color:var(--gold);box-shadow:0 0 0 3px color-mix(in oklab, var(--gold) 15%, transparent)}`}</style>
      </section>
    </div>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
      <div className="mb-5 border-b border-border pb-4">
        <h2 className="font-display text-xl font-semibold text-primary">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-5 md:grid-cols-2">{children}</div>;
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}{required && <span className="ml-1 text-gold">*</span>}
      </span>
      {children}
    </label>
  );
}