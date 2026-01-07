"use client";

import React, { useState } from "react";
import { Gem, Coins, Globe } from "lucide-react";
import Image from "next/image";
import avatarImg from "@/assets/avatars/taylor-swift.jpg";

type FilterMode = "country" | "global";

interface LeaderPlayer {
  rank: number;
  name: string;
  flagEmoji: string;
  gemScore: string;
  coinScore: string;
  avatarUrl: typeof avatarImg;
}

export default function LeadersPage() {
  const [filterMode, setFilterMode] = useState<FilterMode>("country");

  // Mock data for leaders
  const leaders: LeaderPlayer[] = [
    { rank: 1, name: "Taylor Swift", flagEmoji: "🇮🇹", gemScore: "36361.2", coinScore: "2.7B", avatarUrl: avatarImg },
    { rank: 2, name: "Taylor Swift", flagEmoji: "🇮🇹", gemScore: "36361.2", coinScore: "2.7B", avatarUrl: avatarImg },
    { rank: 3, name: "Taylor Swift", flagEmoji: "🇮🇹", gemScore: "36361.2", coinScore: "2.7B", avatarUrl: avatarImg },
    { rank: 4, name: "Taylor Swift", flagEmoji: "🇮🇹", gemScore: "36361.2", coinScore: "2.7B", avatarUrl: avatarImg },
    { rank: 5, name: "Taylor Swift", flagEmoji: "🇮🇹", gemScore: "36361.2", coinScore: "2.7B", avatarUrl: avatarImg },
  ];

  return (
    <main className="w-full px-6 flex items-start justify-center mt-6">
      <section className="flex flex-col w-3/4 gap-2 h-[75vh] overflow-y-auto items-center rounded-xl bg-[#09152A]/35 border-2 border-[#22C8F2] px-4 py-3 backdrop-blur-sm">
        {/* Card Header */}
        <header className="flex w-full items-center justify-between pb-2 border-b border-[#1A3150]/50">
          <h2 className="text-sm font-medium text-white">
            Top Players in {filterMode === "country" ? "italy" : "the world"}
          </h2>

          {/* Filter Buttons */}
          <nav className="flex items-center gap-2">
            {/* Country Filter Button */}
            <button
              onClick={() => setFilterMode("country")}
              className={`flex h-6 w-6 items-center justify-center rounded-md border border-[#1A3150] backdrop-blur-xl transition-all ${
                filterMode === "country"
                  ? "bg-[#09152A]/80"
                  : "bg-[#09152A]/50 opacity-25"
              }`}
              aria-label="Filter by country"
              aria-pressed={filterMode === "country"}
            >
              <span className="text-sm text-white">🇮🇹</span>
            </button>

            {/* Global Filter Button */}
            <button
              onClick={() => setFilterMode("global")}
              className={`flex h-6 w-6 items-center justify-center rounded-md border border-[#1A3150] backdrop-blur-xl transition-all ${
                filterMode === "global"
                  ? "bg-[#09152A]/80"
                  : "bg-[#09152A]/50 opacity-25"
              }`}
              aria-label="Filter globally"
              aria-pressed={filterMode === "global"}
            >
              <Globe size={14} className="text-white" />
            </button>
          </nav>
        </header>

        {/* Leaders List */}
        <ul className="flex flex-col w-full gap-2">
          {leaders.map((leader) => (
            <li
              key={leader.rank}
              className="flex w-full items-center justify-between gap-4 py-2 hover:bg-[#09152A]/40 transition-colors rounded-lg px-2"
            >
              {/* Left Side: Rank + Avatar + Info */}
              <div className="flex items-center gap-3">
                {/* Rank Badge */}
                <div className="flex h-5 w-5 items-center justify-center rounded-md border border-[#1A3150] bg-[#09152A]/50 backdrop-blur-xl">
                  <span className="text-[10px] font-medium text-white">
                    {leader.rank}
                  </span>
                </div>

                {/* Hexagon Avatar */}
                <div className="relative h-9 w-9 flex-shrink-0">
                  {/* Border Shape */}
                  <div
                    className="absolute inset-0 bg-gradient-to-b from-[#6E78B3] to-[#6E78B3]"
                    style={{
                      clipPath:
                        "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                    }}
                  />
                  {/* Image */}
                  <Image
                    src={leader.avatarUrl}
                    alt={leader.name}
                    className="absolute inset-[1px] h-[calc(100%-2px)] w-[calc(100%-2px)] object-cover bg-slate-800"
                    style={{
                      clipPath:
                        "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                    }}
                  />
                </div>

                {/* Player Details */}
                <div className="flex flex-col gap-0.5">
                  {/* Name */}
                  <span className="text-sm font-medium text-[#F3EDF7]">
                    {leader.name}
                  </span>

                  {/* Stats Row */}
                  <div className="flex items-center gap-3 text-[10px] font-medium text-[#F3EDF7]">
                    {/* Gem Stat */}
                    <div className="flex items-center gap-1">
                      <div className="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-[#0098EA]">
                        <Gem size={6} className="text-white fill-white" />
                      </div>
                      <span>{leader.gemScore}</span>
                    </div>

                    {/* Coin Stat */}
                    <div className="flex items-center gap-1">
                      <div className="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-yellow-500">
                        <Coins size={6} className="text-white fill-white" />
                      </div>
                      <span>{leader.coinScore}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Request Game Button */}
              <button className="rounded-md border border-[#1A3150] bg-[#09152A]/50 px-3 py-1.5 text-[10px] font-medium text-white backdrop-blur-xl transition-all hover:bg-[#09152A]/80 active:scale-95 whitespace-nowrap">
                Request Game
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

