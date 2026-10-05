"use client";

import { useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

/** True only after client hydration, so localStorage reads stay off the server. */
export function useHydrated() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
