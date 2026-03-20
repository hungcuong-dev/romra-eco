"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useUser } from "@/components/auth/AuthProvider";
import { getProfile } from "@/lib/drops";

interface DropsContextType {
  totalDrops: number;
  streak: number;
  lastCheckin: string | null;
  loaded: boolean;
  /** Call after any action that changes drops/streak in DB */
  refresh: () => Promise<void>;
  /** Optimistic local update (instant UI) + DB refresh */
  addDropsLocal: (amount: number) => void;
  setStreakLocal: (streak: number, checkinDate: string) => void;
}

const DropsContext = createContext<DropsContextType>({
  totalDrops: 0,
  streak: 0,
  lastCheckin: null,
  loaded: false,
  refresh: async () => {},
  addDropsLocal: () => {},
  setStreakLocal: () => {},
});

export function useDrops() {
  return useContext(DropsContext);
}

export default function DropsProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const [totalDrops, setTotalDrops] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lastCheckin, setLastCheckin] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  const refresh = useCallback(async () => {
    if (!user) return;
    const profile = await getProfile(user.id);
    if (profile) {
      setTotalDrops(profile.total_drops);
      setStreak(profile.streak_count);
      setLastCheckin(profile.last_checkin);
    }
  }, [user]);

  // Initial load
  useEffect(() => {
    if (!user) {
      setLoaded(false);
      setTotalDrops(0);
      setStreak(0);
      setLastCheckin(null);
      return;
    }

    (async () => {
      await refresh();
      setLoaded(true);
    })();
  }, [user, refresh]);

  const addDropsLocal = useCallback((amount: number) => {
    setTotalDrops((prev) => prev + amount);
  }, []);

  const setStreakLocal = useCallback((newStreak: number, checkinDate: string) => {
    setStreak(newStreak);
    setLastCheckin(checkinDate);
  }, []);

  return (
    <DropsContext.Provider
      value={{ totalDrops, streak, lastCheckin, loaded, refresh, addDropsLocal, setStreakLocal }}
    >
      {children}
    </DropsContext.Provider>
  );
}
