"use client";

import { useEffect, useState } from "react";
import { useModalStore } from "@/store/useModalStore";
import GameModal from "@/components/modals/gameModal.tsx";
import ConfirmPurchaseModal from "@/components/modals/confirmPurchase.tsx";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { isOpen, type } = useModalStore();

  // Prevents Hydration Mismatch in Next.js
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      {isOpen && type === "game" && <GameModal />}
      {isOpen && type === "confirm-purchase" && <ConfirmPurchaseModal />}
    </>
  );
};
