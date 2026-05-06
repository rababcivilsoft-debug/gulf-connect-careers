import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "../assets/hero.jpg";
import pattern from "../assets/pattern.jpg";
import { Sparkles, Search, FileText, ShieldCheck, BadgeCheck, Brain, Users, Building2 } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Khaleej Careers — Gulf Talent meets Gulf Opportunity" }] }),
  component: Index,
});

function Index() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero-gradient text-primary-foreground">
        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-screen"
          style={{ backgroundImage: `url(${pattern})`, backgroundSize: "600px" }}
        />
        <div className="container relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 md:grid-cols-2 md:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
              <Sparkles className="h-3.5 w-3.5" /> AI-powered for the Gulf
            </span>
            <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] md:text-6xl">
              Where Gulf <span className="text-gold">talent</span> meets Gulf <span className="text-gold">opportunity</span>.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-primary-foreground/80">
              Khaleej Careers connects GCC citizens with the region's most ambitious employers — powered by smart AI search and verified profiles.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/candidates" className="inline-flex items-center justify-center rounded-md bg-gold-gradient px-6 py-3 text-sm font-semibold text-gold-foreground shadow-gold transition-transform hover:-translate-y-0.5">
                I'm looking for a job
              </Link>
              <Link to="/employers" className="inline-flex items-center justify-center rounded-md border border-primary-foreground/30 bg-primary-foreground/5 px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10">
                I'm hiring talent
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-8 text-sm text-primary-foreground/70">
              <div><div className="font-display text-2xl text-gold">12K+</div>Verified candidates</div>
              <div><div className="font-display text-2xl text-gold">850+</div>GCC employers</div>
              <div><div className="font-display text-2xl text-gold">6</div>Countries</div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-gold/20 blur-2xl" />
            <img
              src={hero}
              alt="Gulf professionals in a Dubai office"
              width={1600}
              height={1100}
              className="relative w-full rounded-2xl object-cover shadow-elegant"
            />
          </div>
        </div>
      </section>

      {/* MESSAGE STRIP */}
      <section className="border-y border-border bg-card">
        <div className="container mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-3 px-4 py-6 text-sm text-muted-foreground">
          <span>UAE 🇦🇪</span><span>Saudi Arabia 🇸🇦</span><span>Kuwait 🇰🇼</span>
          <span>Qatar 🇶🇦</span><span>Bahrain 🇧🇭</span><span>Oman 🇴🇲</span>
        </div>
      </section>

      {/* FEATURES */}
      <section className="container mx-auto max-w-7xl px-4 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Why Khaleej Careers</div>
          <h2 className="mt-3 font-display text-4xl font-bold text-primary md:text-5xl">Built for the Gulf, powered by AI</h2>
          <p className="mt-4 text-muted-foreground">From CV to contract — a smarter, faster, more dignified way to hire and be hired in the GCC.</p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            { icon: Brain, title: "Natural-language search", text: '"Female accountant in Riyadh, 3 years experience" — instantly translated into precise filters.' },
            { icon: FileText, title: "AI CV parsing", text: "Upload a CV or passport — we extract skills, experience and credentials in seconds." },
            { icon: BadgeCheck, title: "Verified Gulf talent", text: "Every profile is checked. Employers see authentic, qualified GCC candidates only." },
            { icon: Search, title: "Precision filters", text: "Title, gender, age, city, experience, salary — search the way recruiters actually think." },
            { icon: ShieldCheck, title: "Privacy first", text: "Sensitive data is masked until employers unlock contact under our payment policy." },
            { icon: Sparkles, title: "Pay per profile", text: "Unlock full candidate details for just 5 AED. No subscriptions, no hidden fees." },
          ].map((f) => (
            <div key={f.title} className="group rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-elegant">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gold-gradient text-gold-foreground shadow-gold">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-primary">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TWO PORTALS */}
      <section className="container mx-auto max-w-7xl px-4 pb-24">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-primary p-10 text-primary-foreground shadow-elegant">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/20 blur-3xl" />
            <Building2 className="h-8 w-8 text-gold" />
            <h3 className="mt-5 font-display text-3xl font-bold">For Employers</h3>
            <p className="mt-3 text-primary-foreground/80">Search, shortlist, and unlock verified Gulf candidates with AI-assisted precision.</p>
            <Link to="/employers" className="mt-6 inline-flex rounded-md bg-gold-gradient px-5 py-2.5 text-sm font-semibold text-gold-foreground shadow-gold">
              Explore the employer portal →
            </Link>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 shadow-elegant">
            <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
            <Users className="h-8 w-8 text-primary" />
            <h3 className="mt-5 font-display text-3xl font-bold text-primary">For Candidates</h3>
            <p className="mt-3 text-muted-foreground">Upload your CV. Our AI builds your profile. The right opportunities find you.</p>
            <Link to="/candidates" className="mt-6 inline-flex rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              Build my profile →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto max-w-7xl px-4 pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-hero-gradient p-12 text-center text-primary-foreground shadow-elegant">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${pattern})`, backgroundSize: "500px" }} />
          <div className="relative">
            <h2 className="font-display text-4xl font-bold md:text-5xl">Empowering GCC citizens with career opportunities.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">Join thousands of Gulf professionals and employers building the future of work in the region.</p>
            <div className="mt-7 flex justify-center gap-3">
              <Link to="/auth" className="rounded-md bg-gold-gradient px-6 py-3 text-sm font-semibold text-gold-foreground shadow-gold">Create free account</Link>
              <Link to="/pricing" className="rounded-md border border-primary-foreground/30 px-6 py-3 text-sm font-semibold">View pricing</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
