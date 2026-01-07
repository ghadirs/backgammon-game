"use client";

import React from "react";
import Image from "next/image";
import { Gem, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useModalStore } from "@/store/useModalStore";

// Demo values for now; could be props or state-driven
const PLAYER_AVATAR = require("@/assets/avatars/taylor-swift.jpg");

export default function VersusModal() {
  const closeModal = useModalStore((state) => state.closeModal);
  const isOpen = useModalStore((state) => state.isOpen && state.type === "versus");

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="max-w-[700px] bg-[#09152A]/10 border border-[#0098EA] backdrop-blur-2xl rounded-2xl p-0 relative">
        <button
          className="flex h-9 w-9 items-center justify-center absolute right-6 top-5 rounded-lg border border-red-900/50 bg-[#FF2428] text-white shadow-lg transition-transform hover:scale-105 active:scale-95 z-10"
          onClick={closeModal}
        >
          <X size={20} strokeWidth={3} />
        </button>
        <Card variant="blue-border" className="w-full bg-transparent flex flex-col">
          {/* Top Title + currency */}
          <div className="flex items-center gap-2 text-white text-[2rem] font-normal tracking-wide px-8 pt-8 pb-2">
            <span className="font-sans">PLAY Online</span>
            <span className="text-[#2BBFFF] font-bold ml-2 flex items-center text-2xl">2</span>
            <Gem size={32} className="ml-1 text-[#2BBFFF] drop-shadow-sm fill-[#2BBFFF]" />
          </div>
          {/* Divider */}
          <div className="w-full h-[1px] bg-[#253554] opacity-50 mb-6" />
          <main className="w-full flex flex-1 flex-col lg:flex-row items-center justify-center gap-10 py-5 mb-6 px-8">
            {/* Player 1 */}
            <section className="flex flex-col items-center">
              <div className="relative">
                {/* Hex Border */}
                <span className="absolute -top-2 -right-2 flex items-center px-1 py-0.5 text-xs font-bold text-[#70e0f3] bg-[#101C30] rounded-full border border-[#38CFFF] shadow-md">{/* Points */}
                  <Gem className="inline mr-1" size={18} />1
                </span>
                <div className="w-[92px] h-[92px]" style={{clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)", background: "#EF4444"}}>
                  <div className="w-[88px] h-[88px] m-[2px]" style={{clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)", background: "#04070C"}}>
                    <Image
                      src={PLAYER_AVATAR}
                      alt="Player 1"
                      width={88}
                      height={88}
                      className="object-cover"
                      style={{clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"}}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 text-lg font-sans font-semibold text-white tracking-wide">USER NAME</div>
            </section>

            {/* VS */}
            <section className="flex flex-col items-center justify-center">
              <div className="text-4xl font-black text-white/90 mb-2">VS</div>
            </section>

            {/* Player 2 */}
            <section className="flex flex-col items-center">
              <div className="relative">
                {/* Hex Border */}
                <span className="absolute -top-2 -right-2 flex items-center px-1 py-0.5 text-xs font-bold text-[#70e0f3] bg-[#101C30] rounded-full border border-[#38CFFF] shadow-md">{/* Points */}
                  <Gem className="inline mr-1" size={18} />1
                </span>
                <div className="w-[92px] h-[92px]" style={{clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)", background: "#EF4444"}}>
                  <div className="w-[88px] h-[88px] m-[2px]" style={{clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)", background: "#04070C"}}>
                    <Image
                      src={PLAYER_AVATAR}
                      alt="Player 2"
                      width={88}
                      height={88}
                      className="object-cover"
                      style={{clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"}}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 text-lg font-sans font-semibold text-white tracking-wide">USER NAME</div>
            </section>
          </main>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

