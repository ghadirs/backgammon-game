"use client";

import React, { useState } from "react";
import { Users, Crown, Gem, X } from "lucide-react";
import { useModalStore } from "@/store/useModalStore.tsx";
import { GameTypeEnum } from "@/types/lobby.ts";
import { Input } from "@/components/ui/input";
import { Button } from "@/components";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

// --- Constants & Styles ---

const DIALOG_STYLES = {
  container:
    "max-w-[560px] bg-[#09152A]/10 border border-[#0098EA] backdrop-blur-2xl rounded-2xl p-0",
  header: "border-b border-[#1A3150] px-6 py-5 relative",
  title: "text-2xl font-normal uppercase tracking-wide text-white text-center",
  content: "px-6 pb-6",
} as const;

const CLOSE_BUTTON_STYLES =
  "flex h-9 w-9 items-center justify-center absolute right-6 top-5 rounded-lg border border-red-900/50 bg-[#FF2428] text-white shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer";

const BET_OPTIONS = [0.5, 1, 3];
const SINGLE_GAME_SLOTS = [1, 2, 3, 4];

// --- Types ---

interface PrivateGame {
  amount: string;
  telegramId: string;
}

// --- Sub-Components ---

const OnlineGameContent = () => {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(1);

  return (
    <div className='flex flex-col items-center py-12'>
      <div className='flex gap-4 mb-10'>
        {BET_OPTIONS.map((amount) => (
          <button
            key={amount}
            onClick={() => setSelectedSlot(amount)}
            className={cn(
              "relative flex h-[60px] min-w-[100px] items-center justify-center gap-3 rounded-xl border transition-all duration-200 px-4",
              selectedSlot === amount
                ? "border-[#0098EA] bg-[#1A3150] shadow-[0_0_15px_rgba(0,152,234,0.3)]"
                : "border-[#1A3150] bg-[#09152A]/40 hover:border-[#2a4a75] hover:bg-[#1A3150]/60"
            )}
          >
            <div className='flex h-6 w-6 items-center justify-center rounded-full bg-[#0098EA] shadow-sm'>
              <Gem
                size={12}
                className='text-white fill-white translate-y-[1px]'
              />
            </div>
            <span className='text-lg font-medium text-white'>{amount}</span>
          </button>
        ))}
      </div>
      <Button
        label={"LAUNCH"}
        icon={
          <div className='flex h-5 w-5 items-center justify-center rounded-full bg-[#0098EA]'>
            <Gem
              size={10}
              className='text-white fill-white translate-y-[0.5px]'
            />
          </div>
        }
      />
    </div>
  );
};

const SingleGameContent = () => {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(1);
  const openModal = useModalStore((state) => state.openModal);

  return (
    <div className='flex flex-col items-center py-12'>
      <div className='flex gap-4 mb-10'>
        {SINGLE_GAME_SLOTS.map((index) => (
          <button
            key={index}
            onClick={() => setSelectedSlot(index)}
            className={cn(
              "group relative flex h-16 w-20 items-center justify-center rounded-xl border transition-all duration-200 cursor-pointer",
              selectedSlot === index
                ? "border-yellow-500 bg-[#1A3150] shadow-[0_0_15px_rgba(234,179,8,0.2)]"
                : "border-[#1A3150] bg-[#09152A]/40 hover:border-[#2a4a75] hover:bg-[#1A3150]/60"
            )}
          >
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-b from-yellow-400 to-yellow-600 shadow-sm",
                selectedSlot === index
                  ? "scale-110"
                  : "opacity-80 grayscale-[0.3] group-hover:grayscale-0"
              )}
            >
              <Crown size={14} className='text-white fill-white' />
            </div>
          </button>
        ))}
      </div>
      <Button
        label='CONTINUE'
        onClick={() => openModal("versus")}
        icon={
          <div className='flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-b from-yellow-400 to-yellow-600 shadow-sm'>
            <Gem
              size={10}
              className='text-white fill-white translate-y-[0.5px]'
            />
          </div>
        }
      />
    </div>
  );
};

const PrivateGameContent = () => {
  const [privateGame, setPrivateGame] = useState<PrivateGame>({
    amount: "",
    telegramId: "",
  });

  const onBetAmountChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrivateGame((prevState) => ({
      ...prevState,
      amount: e.target.value,
    }));
  };

  const onTelegramIdChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") return;
    setPrivateGame((prevState) => ({
      ...prevState,
      telegramId: e.target.value,
    }));
  };

  return (
    <div className='flex flex-col items-center py-12 gap-5'>
      <Input
        value={privateGame.amount}
        onChange={onBetAmountChangeHandle}
        onSubmit={() => null}
        placeholder={"Enter amount of TON..."}
        isLoading={false}
        buttonLabel='Continue'
        icon={
          <div className='flex h-5 w-5 items-center justify-center rounded-full bg-[#0098EA] shadow-sm'>
            <Gem
              size={10}
              className='text-white fill-white translate-y-[0.5px]'
            />
          </div>
        }
      />
      <Input
        value={privateGame.telegramId}
        onChange={onTelegramIdChangeHandle}
        onSubmit={() => null}
        placeholder={"Enter Telegram ID..."}
        isLoading={false}
        buttonLabel='Invite Friends'
        icon={
          <div className='flex h-5 w-5 items-center justify-center rounded-full bg-[#0098EA] shadow-sm'>
            <Users
              size={10}
              className='text-white fill-white translate-y-[0.5px]'
            />
          </div>
        }
      />
    </div>
  );
};

// --- Main Component ---

export default function GameModal() {
  const { isOpen, type, closeModal, gameType } = useModalStore();
  const isModalOpen = isOpen && type === "game";

  const title = gameType !== null ? GameTypeEnum[gameType] : "";

  const renderContent = () => {
    switch (gameType) {
      case GameTypeEnum.ONLINE:
        return <OnlineGameContent />;
      case GameTypeEnum.SINGLE:
        return <SingleGameContent />;
      case GameTypeEnum.PRIVATE:
        return <PrivateGameContent />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent
        className={cn(DIALOG_STYLES.container, "min-h-[400px]")}
        showCloseButton={false}
      >
        <DialogHeader className={DIALOG_STYLES.header}>
          <DialogTitle className={DIALOG_STYLES.title}>{title}</DialogTitle>
          <DialogPrimitive.Close
            onClick={closeModal}
            className={CLOSE_BUTTON_STYLES}
          >
            <X size={20} strokeWidth={3} />
            <span className='sr-only'>Close</span>
          </DialogPrimitive.Close>
        </DialogHeader>

        <div className={DIALOG_STYLES.content}>{renderContent()}</div>
      </DialogContent>
    </Dialog>
  );
}
