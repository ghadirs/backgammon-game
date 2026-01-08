"use client";
import React from "react";
import { useModalStore } from "@/store/useModalStore.tsx";
import { Button } from "@/components";
import ItemCard from "@/components/itemCard.tsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const DIALOG_STYLES = {
  container:
    "max-w-[560px] bg-[#09152A]/10 border border-[#0098EA] backdrop-blur-2xl rounded-2xl p-0",
  header: "border-b border-[#1A3150] px-6 py-5 relative",
  title: "text-2xl font-normal uppercase tracking-wide text-white text-center",
  content: "px-6 pb-6",
} as const;

const CLOSE_BUTTON_STYLES =
  "flex h-9 w-9 items-center justify-center absolute right-6 top-5 rounded-lg border border-red-900/50 bg-[#FF2428] text-white shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer";

export default function ConfirmPurchaseModal() {
  const { isOpen, type, closeModal, openModal } = useModalStore();
  const isModalOpen = isOpen && type === "confirm-purchase";

  return (
    <Dialog open={isModalOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent
        className={DIALOG_STYLES.container}
        showCloseButton={false}
      >
        <DialogHeader className={DIALOG_STYLES.header}>
          <DialogTitle className={DIALOG_STYLES.title}>
            CONFIRM PURCHASE
          </DialogTitle>
          <DialogPrimitive.Close
            onClick={closeModal}
            className={CLOSE_BUTTON_STYLES}
          >
            <X size={20} strokeWidth={3} />
            <span className='sr-only'>Close</span>
          </DialogPrimitive.Close>
        </DialogHeader>
        <div className={DIALOG_STYLES.content}>
          <ItemCard
            className={"max-h-50 mt-4 mx-auto"}
            onClickHandle={() => openModal("confirm-purchase")}
          />
          <div className='flex gap-4 justify-center items-center mt-4 mb-5'>
            <Button label='CANCEL' onClick={() => closeModal()} />
            <Button label='PAY' />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
