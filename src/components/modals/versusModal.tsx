"use client";

import React from "react";
import Image from "next/image";
import { Gem, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useModalStore } from "@/store/useModalStore";
import { Button } from "../ui/button";

// Demo values for now; could be props or state-driven
const PLAYER_AVATAR = require("@/assets/avatars/taylor-swift.jpg");

export default function VersusModal() {
  const closeModal = useModalStore((state) => state.closeModal);
  const isOpen = useModalStore((state) => state.isOpen && state.type === "versus");

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="max-w-[700px] w-[95vw] bg-[#09152A]/10 border border-[#0098EA] backdrop-blur-2xl rounded-2xl p-0">
        <DialogTitle className="sr-only">Versus Game</DialogTitle>
        <button
          className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center absolute right-4 top-4 sm:right-6 sm:top-5 rounded-lg border border-red-900/50 bg-[#FF2428] text-white shadow-lg transition-transform hover:scale-105 active:scale-95 z-10"
          onClick={closeModal}
        >
          <X size={18} strokeWidth={3} />
        </button>
        <Card variant="blue-border" className="w-full bg-transparent flex flex-col">
          {/* Top Title + currency */}
          <div className="flex items-center gap-2 text-white text-xl sm:text-[2rem] font-normal tracking-wide px-4 pt-4 pb-2 sm:px-8 sm:pt-8">
            <span className="font-sans">PLAY Online</span>
            <span className="text-[#2BBFFF] font-bold ml-2 flex items-center text-lg sm:text-2xl">2</span>
            <Gem className="ml-1 text-[#2BBFFF] drop-shadow-sm fill-[#2BBFFF] w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          {/* Divider */}
          <div className="w-full h-[1px] bg-[#253554] opacity-50 mb-4 sm:mb-6" />
          <main className="w-full flex flex-1 flex-row items-center justify-center gap-4 sm:gap-10 py-2 sm:py-5 mb-4 sm:mb-6 px-4 sm:px-8">
            {/* Player 1 */}
            <section className="flex flex-col items-center">
              <div className="relative">
                {/* Hex Border */}
                <span className="absolute -top-2 -right-2 flex items-center px-1 py-0.5 text-[10px] sm:text-xs font-bold text-[#70e0f3] bg-[#101C30] rounded-full border border-[#38CFFF] shadow-md">{/* Points */}
                  <Gem className="inline mr-1 w-3 h-3 sm:w-[18px] sm:h-[18px]" />1
                </span>
                <div className="w-[60px] h-[60px] sm:w-[92px] sm:h-[92px]" style={{clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)", background: "#EF4444"}}>
                  <div className="w-[56px] h-[56px] sm:w-[88px] sm:h-[88px] m-[2px]" style={{clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)", background: "#04070C"}}>
                    <Image
                      src={PLAYER_AVATAR}
                      alt="Player 1"
                      fill
                      className="object-cover"
                      style={{clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"}}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-2 sm:mt-4 text-sm sm:text-lg font-sans font-semibold text-white tracking-wide">USER NAME</div>
            </section>

            {/* VS */}
            <section className="flex flex-col items-center justify-center">
              <div className="text-2xl sm:text-4xl font-black text-white/90 mb-2">VS</div>
            </section>

            {/* Player 2 */}
            <section className="flex flex-col items-center">
              <div className="relative">
                {/* Hex Border */}
                <span className="absolute -top-2 -right-2 flex items-center px-1 py-0.5 text-[10px] sm:text-xs font-bold text-[#70e0f3] bg-[#101C30] rounded-full border border-[#38CFFF] shadow-md">{/* Points */}
                  <Gem className="inline mr-1 w-3 h-3 sm:w-[18px] sm:h-[18px]" />1
                </span>
                <div className="w-[60px] h-[60px] sm:w-[92px] sm:h-[92px]" style={{clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)", background: "#EF4444"}}>
                  <div className="w-[56px] h-[56px] sm:w-[88px] sm:h-[88px] m-[2px]" style={{clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)", background: "#04070C"}}>
                    <Image
                      src={PLAYER_AVATAR}
                      alt="Player 2"
                      fill
                      className="object-cover"
                      style={{clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"}}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-2 sm:mt-4 text-sm sm:text-lg font-sans font-semibold text-white tracking-wide">USER NAME</div>
            </section>
          </main>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

