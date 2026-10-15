"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import dynamic from "next/dynamic";

// The popup (modal + form) is only downloaded the first time someone opens it.
const ContactModal = dynamic(() => import("@/components/ui/ContactModal"));

const ContactModalContext = createContext(null);

/**
 * Holds the open/closed state of the "Get in Touch" popup and renders it.
 * Wrap the app with this provider, then call `useContactModal().openModal()` from any button.
 */
export function ContactModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  // Stays true after the first open so the popup can play its closing animation.
  const [hasOpened, setHasOpened] = useState(false);

  const openModal = useCallback(() => {
    setHasOpened(true);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ openModal }), [openModal]);

  return (
    <ContactModalContext.Provider value={value}>
      {children}
      {hasOpened && <ContactModal isOpen={isOpen} onClose={closeModal} />}
    </ContactModalContext.Provider>
  );
}

/** Returns `{ openModal }`. Must be used inside <ContactModalProvider>. */
export function useContactModal() {
  const context = useContext(ContactModalContext);
  if (!context) {
    throw new Error("useContactModal must be used within ContactModalProvider");
  }
  return context;
}
