import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [
    { title: "Terms & Conditions — Khaleej Careers" },
    { name: "description", content: "Platform terms, privacy, and payment policy." },
  ]}),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-20">
      <div className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Legal</div>
      <h1 className="mt-3 font-display text-5xl font-bold text-primary">Terms & Conditions</h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated: May 2026</p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-foreground">
        <Section title="1. Data Privacy">
          Khaleej Careers collects only the data necessary to connect candidates with employers. Personal data is stored securely and never sold to third parties. Candidates control which fields are visible.
        </Section>
        <Section title="2. No Misuse of Candidate Data">
          Employers who unlock candidate details agree to use the information solely for legitimate recruitment purposes. Spamming, harassment, or resale of contact data is strictly prohibited and will result in account termination.
        </Section>
        <Section title="3. Payment Policy">
          All payments (including the 5 AED profile-unlock fee) are <strong>non-refundable</strong>. Once a profile is unlocked, the transaction is final. Bulk credit packs follow the same policy.
        </Section>
        <Section title="4. Intermediary Role">
          Khaleej Careers is a platform that facilitates introductions between candidates and employers. We do not employ candidates and are not a party to any employment relationship that may result.
        </Section>
        <Section title="5. Account Eligibility">
          Candidates must be GCC citizens or legal residents eligible to work in the Gulf. Employers must be registered businesses operating in a GCC jurisdiction.
        </Section>
        <Section title="6. Acceptance">
          By creating an account you confirm you have read, understood, and agreed to these terms.
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-primary">{title}</h2>
      <p className="mt-2 text-muted-foreground">{children}</p>
    </div>
  );
}
