"use client";

import { useState, useEffect } from "react";

export function useIntroSeen() {
  const [seen, setSeen] = useState(true); // default true to avoid flash
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // sessionStorage resets on reload/new tab, persists during navigation
    const introSeen = sessionStorage.getItem("introSeen") === "true";
    setSeen(introSeen);
    setLoaded(true);
  }, []);

  const markSeen = () => {
    sessionStorage.setItem("introSeen", "true");
    setSeen(true);
  };

  return { seen, loaded, markSeen };
}
