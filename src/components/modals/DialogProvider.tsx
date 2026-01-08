"use client";

import React, { useState, useEffect } from "react";
import GameModal from "@/components/modals/gameModal";
import ConfirmPurchaseModal from "@/components/modals/confirmPurchase";
import VersusModal from "@/components/modals/versusModal";

// Dialog Provider Component
export function DialogProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <GameModal />
      <ConfirmPurchaseModal />
      <VersusModal />
    </>
  );
}
