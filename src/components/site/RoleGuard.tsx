import { Link } from "@tanstack/react-router";
import { useSession, type Role } from "../../lib/auth";
import { Lock } from "lucide-react";

export function RoleGuard({ role, children }: { role: Role; children: React.ReactNode }) {
  const session = useSession();
  const sessionRole = session?.user?.role;
  if (sessionRole === role) return <>{children}</>;

  const label = role === "employer" ? "Employer" : "Candidate";
  return (
    <div className="container mx-auto max-w-xl px-4 py-24 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold">
        <Lock className="h-6 w-6" />
      </div>
      <h1 className="mt-6 font-display text-3xl font-bold text-primary">
        {label} access required
      </h1>
      <p className="mt-3 text-muted-foreground">
        {session
          ? `You're signed in as a ${sessionRole ?? "different role"}. Sign in with a ${role} account to view this page.`
          : `Please sign in as a ${role} to access this section.`}
      </p>
      <Link
        to="/auth"
        className="mt-7 inline-flex items-center justify-center rounded-md bg-gold-gradient px-6 py-3 text-sm font-semibold text-gold-foreground shadow-gold"
      >
        Go to sign in
      </Link>
    </div>
  );
}
