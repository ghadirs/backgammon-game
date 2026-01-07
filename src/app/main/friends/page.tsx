"use client";
import React, { useState } from "react";
import { Gem, Coins, Trash2, Check, CheckCircle, UserPlus } from "lucide-react";
import Image from "next/image";
import avatarImg from "@/assets/avatars/taylor-swift.jpg";
import FriendsSwitch from "@/components/friendsSwitch.tsx";
import { FriendsTabOption } from "@/types/friends.ts";

interface PlayerProps {
  title: string;
  flagEmoji: string; // e.g., "🇮🇹"
  gemScore: string; // e.g., "36361.2"
  coinScore: string; // e.g., "2.7B"
  avatarUrl: string;
}

export default function FriendsPage({
  title = "Taylor Swift",
  flagEmoji = "🇮🇹",
  gemScore = "36361.2",
  coinScore = "2.7B",
  avatarUrl = avatarImg,
}: PlayerProps) {
  const [activeTab, setActiveTab] = useState<FriendsTabOption>("friends");
  const friends = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  return (
    // Card Container
    <main className='w-full px-6 flex items-start justify-center mt-6'>
      <div className='flex flex-col w-3/4 gap-2 h-[75vh] overflow-y-scroll items-center justify-between rounded-xl bg-[#09152A]/35 border border-[#0098EA] px-4 py-2 backdrop-blur-sm'>
        <FriendsSwitch activeTab={activeTab} setActiveTab={setActiveTab} />
        {friends.map((e, idx) => (
          <div
            key={idx}
            className='flex w-full items-center justify-between rounded-l gap-4 p-1 hover:bg-[#09152A]/60 transition-colors'
          >
            {/* Left Side: Avatar + Info */}
            <div className='flex items-center gap-4'>
              {/* Hexagon Avatar Wrapper */}
              <div className='relative h-14 w-14 flex-shrink-0'>
                {/* Border Shape (Blue Gradient background) */}
                <div
                  className='absolute inset-0 bg-gradient-to-b from-blue-500 to-blue-900'
                  style={{
                    clipPath:
                      "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  }}
                />
                {/* Image (Slightly smaller to reveal border) */}
                <Image
                  src={avatarUrl}
                  alt={title}
                  className='absolute inset-[2px] h-[calc(100%-4px)] w-[calc(100%-4px)] object-cover bg-slate-800'
                  style={{
                    clipPath:
                      "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  }}
                />
              </div>

              {/* Player Details */}
              <div className='flex flex-col gap-1'>
                {/* Name Row */}
                <div className='flex items-center gap-2'>
                  <span className='text-lg leading-none'>{flagEmoji}</span>
                  <span className='text-base font-medium text-white'>
                    {title}
                  </span>
                </div>

                {/* Stats Row */}
                <div className='flex items-center gap-4 text-xs font-medium text-slate-300'>
                  {/* Gem Stat */}
                  <div className='flex items-center gap-1.5'>
                    <div className='flex h-4 w-4 items-center justify-center rounded-full bg-[#0098EA]'>
                      <Gem size={8} className='text-white fill-white' />
                    </div>
                    <span>{gemScore}</span>
                  </div>

                  {/* Coin Stat */}
                  <div className='flex items-center gap-1.5'>
                    <div className='flex h-4 w-4 items-center justify-center rounded-full bg-yellow-500'>
                      <Coins size={8} className='text-white fill-white' />
                    </div>
                    <span>{coinScore}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Action Buttons */}
            <div className='flex items-center gap-2'>
              {/* Delete Icon Button */}
              <button className='flex h-10 w-10 items-center justify-center rounded-lg border border-[#0098EA] bg-[#162A45]/50 transition-all hover:bg-[#162A45]/80 active:scale-95'>
                <Trash2 size={16} className='text-red-500' />
              </button>

              {/* Conditional Right Button based on activeTab */}
              {activeTab === "friends" && (
                <button className='rounded-lg border border-[#0098EA] bg-[#162A45]/50 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-[#0098EA] hover:border-[#0098EA] active:scale-95 whitespace-nowrap'>
                  Request Game
                </button>
              )}
              {activeTab === "requests" && (
                <button className='flex h-10 w-10 items-center justify-center rounded-lg border border-[#0098EA] bg-[#162A45]/50 transition-all hover:bg-[#162A45]/80 active:scale-95'>
                  <CheckCircle size={16} className='text-green-500' />
                </button>
              )}
              {activeTab === "suggests" && (
                <button className='flex h-10 w-10 items-center justify-center rounded-lg border border-[#0098EA] bg-[#162A45]/50 transition-all hover:bg-[#162A45]/80 active:scale-95'>
                  <UserPlus size={16} className='text-green-500' />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
