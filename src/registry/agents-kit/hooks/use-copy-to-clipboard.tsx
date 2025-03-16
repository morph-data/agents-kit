"use client";

import { useCallback, useState } from "react";

export function useCopyToClipboard() {
  const [showTooltip, setShowTooltip] = useState(false);

  const openTooltip = useCallback(() => {
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 3000);
  }, []);

  const copy = useCallback(
    async (text: string) => {
      if (!navigator?.clipboard) {
        console.warn("Clipboard not supported");
        return false;
      }

      // Try to save to clipboard then save it in the state if worked
      try {
        await navigator.clipboard.writeText(text);
        openTooltip();
        return true;
      } catch (error) {
        console.warn("Copy failed", error);
        return false;
      }
    },
    [openTooltip]
  );

  return {
    copy,
    showTooltip,
  };
}
