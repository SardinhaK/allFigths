"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import { DEMO_MANAGER } from "@/lib/academy";
import { useHydrated } from "@/hooks/use-hydrated";
import { SESSION_STORAGE_KEY, type ManagerSession } from "@/lib/students";

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === SESSION_STORAGE_KEY || event.key === null) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot() {
  return localStorage.getItem(SESSION_STORAGE_KEY);
}

function getServerSnapshot() {
  return null;
}

function parseSession(raw: string | null): ManagerSession | null {
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (
      !parsed ||
      typeof parsed !== "object" ||
      typeof (parsed as ManagerSession).email !== "string" ||
      typeof (parsed as ManagerSession).loggedInAt !== "string"
    ) {
      return null;
    }
    return parsed as ManagerSession;
  } catch {
    return null;
  }
}

export function useSession() {
  const hydrated = useHydrated();
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const session = useMemo(
    () => (hydrated ? parseSession(raw) : null),
    [hydrated, raw]
  );

  const login = useCallback((email: string, password: string) => {
    const normalized = email.trim().toLowerCase();
    if (
      normalized !== DEMO_MANAGER.email ||
      password !== DEMO_MANAGER.password
    ) {
      return { ok: false as const };
    }
    const next: ManagerSession = {
      email: DEMO_MANAGER.email,
      loggedInAt: new Date().toISOString(),
    };
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(next));
    emit();
    return { ok: true as const };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    emit();
  }, []);

  return {
    session,
    status: hydrated ? ("ready" as const) : ("loading" as const),
    login,
    logout,
    isAuthenticated: Boolean(session),
  };
}
