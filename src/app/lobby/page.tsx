"use client";

import React from "react";
import "./lobby.module.scss";
import { ChevronRight } from "lucide-react";
import { useModalStore } from "@/store/useModalStore.tsx";
import { GameTypeEnum } from "@/types/lobby.ts";

function LobbyPage() {
  const openModal = useModalStore((state) => state.openModal);
  const setGameType = useModalStore((state) => state.setGameType);

  const gameCards: GameTypeEnum[] = [0, 1, 2];

  const onClickPlayHandle = () => {
    openModal("game");
  };

  return (
    <main className="flex-1 w-full px-6 flex gap-4 items-center justify-center mt-2">
      {gameCards.map((game) => (
        <div className="game-card relative group w-1/3 h-[140px] rounded-xl overflow-hidden cursor-pointer shadow-lg border border-transparent hover:border-[#1A3150]">
          <img
            src={`images/lobby/${GameTypeEnum[game]}.png`}
            className="w-full h-full object-cover"
            alt="Backgammon Board"
          />
          <div
            onClick={onClickPlayHandle}
            className="absolute bottom-0 w-full h-[36px] bg-card-overlay backdrop-blur-sm flex justify-between items-center px-3 border-t border-white/10"
          >
            <span className="text-white text-xs font-light">
              Play Now! - SINGLE
            </span>
            <ChevronRight className="fas fa-chevron-right text-gray-400 text-xs group-hover:text-white transition-colors" />
          </div>
        </div>
      ))}
    </main>
  );
}

export default LobbyPage;
