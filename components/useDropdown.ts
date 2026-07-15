"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Shared open/pin/outside-click/Escape behavior for a hover-opens,
 * click-pins nav dropdown (About, Projects, ...). Hovering the trigger
 * opens the panel; clicking the trigger "pins" it open so it stays open
 * after the mouse leaves, until it's clicked again, a link inside is
 * picked, Escape is pressed, or a click lands outside it.
 */
export function useDropdown() {
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const close = () => {
    setOpen(false);
    setPinned(false);
  };

  const togglePin = () => {
    setPinned((wasPinned) => {
      const next = !wasPinned;
      setOpen(next);
      return next;
    });
  };

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        close();
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return {
    ref,
    open,
    pinned,
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => {
      if (!pinned) setOpen(false);
    },
    togglePin,
    close,
  };
}
