"use client";

import React, { useState } from "react";
import { X, Crown, Gem } from "lucide-react";
import { useModalStore } from "@/store/useModalStore.tsx";
import { GameTypeEnum } from "@/types/lobby.ts";

export default function GameModal() {
  // State to track which slot is selected (optional interactivity)
  const [selectedSlot, setSelectedSlot] = useState<number | null>(1);
  const betOptions = [0.5, 1, 3];

  const closeModal = useModalStore((state) => state.closeModal);
  const gameType = useModalStore((state) => state.gameType);

  const onClickPlayHandle = () => {
    closeModal();
  };
  return (
    // Backdrop Overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      {/* Modal Container */}
      <div className="relative w-full max-w-[560px] overflow-hidden rounded-2xl border border-[#1A3150] bg-[#09152A]/85 shadow-2xl backdrop-blur-xl">
        {/* Header Section */}
        <div className="flex items-center justify-between border-b border-[#1A3150] px-6 py-5">
          <h2 className="text-2xl font-normal uppercase tracking-wide text-white">
            PLAY SINGLE
          </h2>

          {/* Close Button */}
          <button
            onClick={closeModal}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-900/50 bg-[#FF2428] text-white shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <X size={20} strokeWidth={3} />
          </button>
        </div>

        {/* Betting Options Row */}
        {gameType == GameTypeEnum.ONLINE && (
          <div className="flex flex-wrap justify-center gap-5 mb-10">
            {betOptions.map((amount) => (
              <button
                key={amount}
                onClick={() => setSelectedSlot(amount)}
                className={`
                  relative flex h-[60px] min-w-[100px] items-center justify-center gap-3 rounded-xl border transition-all duration-200 px-4
                  ${
                    selectedSlot === amount
                      ? "border-[#0098EA] bg-[#1A3150] shadow-[0_0_15px_rgba(0,152,234,0.3)]" // Active State (TON Blue)
                      : "border-[#1A3150] bg-[#09152A]/40 hover:border-[#2a4a75] hover:bg-[#1A3150]/60" // Default
                  }
                `}
              >
                {/* TON Icon Representation */}
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0098EA] shadow-sm">
                  <Gem
                    size={12}
                    className="text-white fill-white translate-y-[1px]"
                  />
                </div>

                {/* Amount Text */}
                <span className="text-lg font-medium text-white">{amount}</span>
              </button>
            ))}
          </div>
        )}

        {/* Single Game */}
        {gameType == GameTypeEnum.SINGLE && (
          <div className="flex flex-col items-center py-12">
            {/* Selection Row (4 Cards) */}
            <div className="flex gap-4 mb-10">
              {[1, 2, 3, 4].map((index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSlot(index)}
                  className={`
                  group relative flex h-16 w-20 items-center justify-center rounded-xl border transition-all duration-200
                  ${
                    selectedSlot === index
                      ? "border-yellow-500 bg-[#1A3150] shadow-[0_0_15px_rgba(234,179,8,0.2)]" // Active State
                      : "border-[#1A3150] bg-[#09152A]/40 hover:border-[#2a4a75] hover:bg-[#1A3150]/60" // Default State
                  }
                `}
                >
                  {/* Crown Icon */}
                  <div
                    className={`
                   flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-b from-yellow-400 to-yellow-600 shadow-sm
                   ${selectedSlot === index ? "scale-110" : "opacity-80 grayscale-[0.3] group-hover:grayscale-0"}
                `}
                  >
                    <Crown size={14} className="text-white fill-white" />
                  </div>
                </button>
              ))}
            </div>

            {/* Continue Button */}
            <button className="group flex h-12 min-w-[160px] items-center justify-center gap-3 rounded-xl border border-[#1A3150] bg-[#09152A]/60 px-8 transition-all hover:bg-[#1A3150] hover:shadow-lg active:scale-95">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-b from-yellow-400 to-yellow-600">
                <Crown size={10} className="text-white fill-white" />
              </div>
              <span className="text-sm font-medium uppercase tracking-wide text-white">
                Continue
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
