import { useEffect, useState } from "react";

export type Role = "candidate" | "employer";
export type Session = {
  token: string;
  expiresAtUtc: string;
  user: {
    id: string;
    role: Role;
    email: string;
    displayName: string;
    phoneNumber?: string | null;
  };
} | null;

type ApiRole = "Candidate" | "Employer";

type AuthResponse = {
  token: string;
  expiresAtUtc: string;
  user: {
    id: string;
    email: string;
    role: ApiRole;
    displayName: string;
    phoneNumber?: string | null;
  };
};

type LoginRequest = {
  email: string;
  password: string;
};

type RegisterCandidateRequest = LoginRequest & {
  fullName: string;
  phoneNumber?: string;
};

type RegisterEmployerRequest = LoginRequest & {
  companyName: string;
  contactName: string;
  phoneNumber?: string;
};

const KEY = "kc_session";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:5026";

export function getSession(): Session {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;

    const session = JSON.parse(raw) as unknown;
    if (isSession(session)) return session;

    localStorage.removeItem(KEY);
    return null;
  } catch {
    localStorage.removeItem(KEY);
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

export function getAuthToken() {
  return getSession()?.token ?? null;
}

export async function login(request: LoginRequest) {
  return authRequest("/api/auth/login", request);
}

export async function registerCandidate(request: RegisterCandidateRequest) {
  return authRequest("/api/auth/register/candidate", request);
}

export async function registerEmployer(request: RegisterEmployerRequest) {
  return authRequest("/api/auth/register/employer", request);
}

async function authRequest(path: string, body: object): Promise<Session> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error(`Cannot connect to the API at ${API_BASE_URL}. Make sure the backend is running.`);
  }

  const data = await readJson(response);
  if (!response.ok) {
    throw new Error(getErrorMessage(data, "Authentication failed."));
  }

  const auth = data as AuthResponse;
  const session: Session = {
    token: auth.token,
    expiresAtUtc: auth.expiresAtUtc,
    user: {
      ...auth.user,
      role: normalizeRole(auth.user.role),
    },
  };

  setSession(session);
  return session;
}

async function readJson(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function getErrorMessage(data: unknown, fallback: string) {
  if (data && typeof data === "object" && "message" in data) {
    const message = (data as { message?: unknown }).message;
    if (typeof message === "string") return message;
  }

  if (data && typeof data === "object" && "errors" in data) {
    const errors = (data as { errors?: Record<string, string[]> }).errors;
    const firstError = errors && Object.values(errors).flat()[0];
    if (firstError) return firstError;
  }

  return fallback;
}

function normalizeRole(role: ApiRole): Role {
  return role === "Employer" ? "employer" : "candidate";
}

function isSession(value: unknown): value is NonNullable<Session> {
  if (!value || typeof value !== "object") return false;

  const session = value as {
    token?: unknown;
    expiresAtUtc?: unknown;
    user?: {
      id?: unknown;
      role?: unknown;
      email?: unknown;
      displayName?: unknown;
    };
  };

  return typeof session.token === "string"
    && typeof session.expiresAtUtc === "string"
    && typeof session.user?.id === "string"
    && (session.user.role === "candidate" || session.user.role === "employer")
    && typeof session.user.email === "string"
    && typeof session.user.displayName === "string";
}
