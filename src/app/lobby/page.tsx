"use client";

import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { useModalStore } from "@/store/useModalStore.tsx";
import Image from "next/image";
import { GameCardType } from "@/types/lobby.ts";
import kingImg from "@/assets/images/lobby/king.png";
import onlineGameImg from "@/assets/images/lobby/online.png";
import privateGameImg from "@/assets/images/lobby/private.png";

function LobbyPage() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const openModal = useModalStore((state) => state.openModal);
  const setGameType = useModalStore((state) => state.setGameType);

  const gameCards: GameCardType[] = [
    {
      title: "SINGLE",
      imgSrc: kingImg,
    },
    {
      title: "ONLINE",
      imgSrc: onlineGameImg,
    },
    {
      title: "PRIVATE",
      imgSrc: privateGameImg,
    },
  ];

  const onClickPlayHandle = (idx: number) => {
    setSelectedCard(idx);
    setGameType(idx);
    openModal("game");
  };

  return (
    <main className='flex-1 w-full px-6 flex gap-4 items-center justify-center mt-2'>
      {gameCards.map((game, idx) => (
        <div
        key={idx}
          className='flex flex-col items-center w-1/3 max-w-[400px] min-w-[120px] max-h-[400px]'
          onClick={() => onClickPlayHandle(idx)}
        >
          {/* Container Logic:
        Figma defines the top (image) and bottom (button) as separate rectangles.
        We stack them using Flexbox.
        Width is set to w-[159px] per Figma, but you can use w-full in a grid.
      */}
          <div className='relative flex flex-col w-full h-auto max-w-[400px] max-h-[400px] group cursor-pointer transition-transform duration-200 hover:-translate-y-1'>
            {/* --- Top Section: Image Area --- */}
            <div
              className={`
            relative h-[128px] w-full overflow-hidden rounded-t-[20px] 
            transition-all duration-300
            ${
              selectedCard == idx
                ? "border-[3px] border-b-0 border-[#00CCFF] shadow-[0_0_15px_rgba(0,204,255,0.3)]"
                : "border border-b-0 border-white/30"
            }
          `}
            >
              {/* Background Image Placeholder */}

              <Image
                src={game.imgSrc}
                alt={game.title}
                className='w-full h-full object-cover'
              />

              {/* Optional: Glossy overlay reflection matching the "glass" feel of the design */}
              <div className='absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none' />
            </div>

            {/* --- Bottom Section: "Play Now!" Button --- */}
            <div
              className={`
            relative h-[31px] w-full flex items-center justify-center 
            rounded-b-[12px] backdrop-blur-[40px]
            transition-all duration-300
            ${
              selectedCard == idx
                ? "border-[3px] border-t-0 border-[#00CCFF] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(25,94,117,0.7)_25%,rgba(0,204,255,0.7)_100%)]"
                : "bg-[#1A3150]/70" // Default dark blue transparency
            }
          `}
            >
              {/* Text Content */}
              <div className='flex items-center gap-1 z-10'>
                <span
                  className='text-white text-[14px] leading-[15px] font-sans tracking-wide drop-shadow-sm'
                  style={{ fontFamily: "'Strait', sans-serif" }} // Inline font-family from Figma
                >
                  Play Now! - {game.title}
                </span>

                {/* Show chevron only on default state (based on previous html logic), or keep clean for "Play Now" */}
                {selectedCard !== idx && (
                  <ChevronRight size={12} className='text-gray-400' />
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </main>
  );
}

export default LobbyPage;
