import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({ meta: [
    { title: "Pricing — Khaleej Careers" },
    { name: "description", content: "Simple pay-per-profile pricing for Gulf employers. Free for candidates." },
  ]}),
  component: PricingPage,
});

function PricingPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <div className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Pricing</div>
        <h1 className="mt-3 font-display text-5xl font-bold text-primary">Honest, pay-per-profile pricing</h1>
        <p className="mt-4 text-muted-foreground">Free forever for candidates. Employers pay only for the profiles they unlock.</p>
      </div>

      <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-border bg-card p-8">
          <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Candidate</div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-display text-5xl font-bold text-primary">Free</span>
            <span className="text-sm text-muted-foreground">always</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">Build your profile, get discovered, manage applications.</p>
          <ul className="mt-6 space-y-3 text-sm">
            {["AI-powered CV parsing","Editable Gulf-localized profile","Unlimited employer views","Privacy controls"].map((f) => (
              <li key={f} className="flex gap-2"><Check className="h-4 w-4 text-gold" />{f}</li>
            ))}
          </ul>
          <Link to="/candidates" className="mt-8 block w-full rounded-md border border-border py-2.5 text-center text-sm font-semibold hover:bg-muted">
            Build my profile
          </Link>
        </div>

        <div className="relative rounded-3xl bg-hero-gradient p-8 text-primary-foreground shadow-elegant">
          <span className="absolute right-6 top-6 rounded-full bg-gold/20 px-3 py-1 text-[11px] font-semibold text-gold">Most popular</span>
          <div className="text-xs font-semibold uppercase tracking-widest text-gold">Employer</div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-display text-5xl font-bold text-gold">5 AED</span>
            <span className="text-sm text-primary-foreground/70">/ profile unlock</span>
          </div>
          <p className="mt-3 text-sm text-primary-foreground/80">No subscription. No commitment. Pay only for the candidates you choose.</p>
          <ul className="mt-6 space-y-3 text-sm">
            {["Unlimited search & filtering","AI natural-language search","Verified Gulf candidates","Full contact details on unlock","Bulk credit packs available"].map((f) => (
              <li key={f} className="flex gap-2"><Check className="h-4 w-4 text-gold" />{f}</li>
            ))}
          </ul>
          <Link to="/employers" className="mt-8 block w-full rounded-md bg-gold-gradient py-2.5 text-center text-sm font-semibold text-gold-foreground shadow-gold">
            Start hiring
          </Link>
        </div>
      </div>

      <p className="mt-10 text-center text-xs text-muted-foreground">Payments are non-refundable. See <Link to="/terms" className="underline">Terms & Conditions</Link>.</p>
    </div>
  );
}
