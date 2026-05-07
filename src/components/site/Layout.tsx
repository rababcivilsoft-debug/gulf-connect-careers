import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useSession, setSession } from "../../lib/auth";

export function Header() {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  const session = useSession();
  const nav = [
    { to: "/", label: "Home" },
    ...(session?.role === "employer" ? [{ to: "/employers", label: "For Employers" }] : []),
    ...(session?.role === "employer" ? [{ to: "/company-profile", label: "Company Profile" }] : []),
    ...(session?.role === "candidate" ? [{ to: "/candidates", label: "For Candidates" }] : []),
    { to: "/pricing", label: "Pricing" },
    { to: "/terms", label: "Terms" },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gold-gradient shadow-gold">
            <span className="font-display text-lg font-bold text-primary">K</span>
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg font-bold text-primary">Khaleej Careers</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Gulf Talent Network</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`text-sm font-medium transition-colors hover:text-primary ${loc.pathname === n.to ? "text-primary" : "text-muted-foreground"}`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          {session ? (
            <button
              onClick={() => setSession(null)}
              className="inline-flex items-center justify-center rounded-md bg-gold-gradient px-4 py-2 text-sm font-semibold text-gold-foreground shadow-gold transition-transform hover:-translate-y-0.5"
            >
              Sign out
            </button>
          ) : (
            <>
              <Link to="/auth" className="text-sm font-medium text-foreground hover:text-primary">Sign in</Link>
              <Link
                to="/auth"
                className="inline-flex items-center justify-center rounded-md bg-gold-gradient px-4 py-2 text-sm font-semibold text-gold-foreground shadow-gold transition-transform hover:-translate-y-0.5"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="flex flex-col gap-2 p-4">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted">
                {n.label}
              </Link>
            ))}
            {session ? (
              <button
                onClick={() => { setSession(null); setOpen(false); }}
                className="mt-2 inline-flex items-center justify-center rounded-md bg-gold-gradient px-4 py-2 text-sm font-semibold text-gold-foreground"
              >
                Sign out
              </button>
            ) : (
              <Link to="/auth" onClick={() => setOpen(false)} className="mt-2 inline-flex items-center justify-center rounded-md bg-gold-gradient px-4 py-2 text-sm font-semibold text-gold-foreground">
                Get Started
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-primary text-primary-foreground">
      <div className="container mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <div className="font-display text-xl font-bold">Khaleej Careers</div>
          <p className="mt-3 text-sm text-primary-foreground/70">
            Bridging the gap between Gulf employers and exceptional Gulf talent.
          </p>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-gold">Platform</div>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/employers">For Employers</Link></li>
            <li><Link to="/candidates">For Candidates</Link></li>
            <li><Link to="/pricing">Pricing</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-gold">Company</div>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/terms">Terms & Privacy</Link></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-gold">Coverage</div>
          <p className="mt-4 text-sm text-primary-foreground/80">
            UAE • Saudi Arabia • Kuwait • Qatar • Bahrain • Oman
          </p>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 py-5 text-center text-xs text-primary-foreground/60">
        © {new Date().getFullYear()} Khaleej Careers. All rights reserved.
      </div>
    </footer>
  );
}

export default function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1"><Outlet /></main>
      <Footer />
    </div>
  );
}
