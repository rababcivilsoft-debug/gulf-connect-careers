import { useEffect, useState } from "react";

export type Role = "candidate" | "employer";
export type Session = { role: Role; email: string } | null;

const KEY = "kc_session";

export function getSession(): Session {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export function setSession(s: Session) {
  if (typeof window === "undefined") return;
  if (s) localStorage.setItem(KEY, JSON.stringify(s));
  else localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("kc-auth-change"));
}

export function useSession(): Session {
  const [s, setS] = useState<Session>(null);
  useEffect(() => {
    setS(getSession());
    const handler = () => setS(getSession());
    window.addEventListener("kc-auth-change", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("kc-auth-change", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);
  return s;
}