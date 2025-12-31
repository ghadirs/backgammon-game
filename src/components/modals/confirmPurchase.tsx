"use client";
import React, { useState } from "react";
import { useModalStore } from "@/store/useModalStore.tsx";
import { Button } from "@/components";
import Modal from "@/components/modals/modal.tsx";
import ItemCard from "@/components/itemCard.tsx";

export default function ConfirmPurchaseModal() {
  const closeModal = useModalStore((state) => state.closeModal);
  const openModal = useModalStore((state) => state.openModal);

  return (
    <Modal title={"CONFIRM PURCHASE"} onClose={closeModal}>
      <ItemCard onClickHandle={() => openModal("confirm-purchase")} />
      <div className="flex gap-4 justify-center items-center mt-4 mb-5">
        <Button label="CANCEL" onClick={() => closeModal()} />
        <Button label="PAY" />
      </div>
    </Modal>
  );
}
