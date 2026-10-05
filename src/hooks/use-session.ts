"use client";

import { useCallback, useEffect, useState } from "react";

export type AttendantSession = {
  email: string;
  name: string;
  unitId: string;
  unitSlug: string;
  unitName: string;
};

type SessionState = {
  status: "loading" | "ready";
  attendant: AttendantSession | null;
};

export function useSession() {
  const [state, setState] = useState<SessionState>({
    status: "loading",
    attendant: null,
  });

  const refresh = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/me", { cache: "no-store" });
      if (!response.ok) {
        setState({ status: "ready", attendant: null });
        return null;
      }
      const data = (await response.json()) as {
        attendant: AttendantSession;
      };
      setState({ status: "ready", attendant: data.attendant });
      return data.attendant;
    } catch {
      setState({ status: "ready", attendant: null });
      return null;
    }
  }, []);

  useEffect(() => {
    // Carrega a sessão do cookie no mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetch inicial da sessão
    void refresh();
  }, [refresh]);

  const login = useCallback(async (email: string, password: string) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      return { ok: false as const };
    }
    const data = (await response.json()) as { attendant: AttendantSession };
    setState({ status: "ready", attendant: data.attendant });
    return { ok: true as const, attendant: data.attendant };
  }, []);

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setState({ status: "ready", attendant: null });
  }, []);

  return {
    status: state.status,
    attendant: state.attendant,
    isAuthenticated: Boolean(state.attendant),
    login,
    logout,
    refresh,
  };
}
