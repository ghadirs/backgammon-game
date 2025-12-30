import React from "react";
import {Gem, Coins} from "lucide-react";

interface PlayerProps {
    name: string;
    flagEmoji: string; // e.g., "🇮🇹"
    gemScore: string; // e.g., "36361.2"
    coinScore: string; // e.g., "2.7B"
    avatarUrl: string;
}

export default function PlayerRequestRow({
                                             name = "Taylor Swift",
                                             flagEmoji = "🇮🇹",
                                             gemScore = "36361.2",
                                             coinScore = "2.7B",
                                             avatarUrl = "avatars/taylor-swift.jpg",
                                         }: Partial<PlayerProps>) {
    const friends = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    return (
        // Card Container
        <main className="w-full px-6 flex items-start justify-center mt-6">
            <div
                className="flex flex-col w-3/4 gap-2 h-[60vh] overflow-y-scroll items-center justify-between rounded-xl bg-[#09152A]/35 border-b border-[#1A3150] px-4 py-2 backdrop-blur-sm">
                {friends.map((e, idx) => (
                    <div
                        key={idx}
                        className="flex w-full items-center justify-between rounded-l gap-4 p-1 hover:bg-[#09152A]/60 transition-colors"
                    >
                        {/* Left Side: Avatar + Info */}
                        <div className="flex items-center gap-4">
                            {/* Hexagon Avatar Wrapper */}
                            <div className="relative h-14 w-14 flex-shrink-0">
                                {/* Border Shape (Blue Gradient background) */}
                                <div
                                    className="absolute inset-0 bg-gradient-to-b from-blue-500 to-blue-900"
                                    style={{
                                        clipPath:
                                            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                                    }}
                                />
                                {/* Image (Slightly smaller to reveal border) */}
                                <img
                                    src={avatarUrl}
                                    alt={name}
                                    className="absolute inset-[2px] h-[calc(100%-4px)] w-[calc(100%-4px)] object-cover bg-slate-800"
                                    style={{
                                        clipPath:
                                            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                                    }}
                                />
                            </div>

                            {/* Player Details */}
                            <div className="flex flex-col gap-1">
                                {/* Name Row */}
                                <div className="flex items-center gap-2">
                                    <span className="text-lg leading-none">{flagEmoji}</span>
                                    <span className="text-base font-medium text-white">
                    {name}
                  </span>
                                </div>

                                {/* Stats Row */}
                                <div className="flex items-center gap-4 text-xs font-medium text-slate-300">
                                    {/* Gem Stat */}
                                    <div className="flex items-center gap-1.5">
                                        <div
                                            className="flex h-4 w-4 items-center justify-center rounded-full bg-[#0098EA]">
                                            <Gem size={8} className="text-white fill-white"/>
                                        </div>
                                        <span>{gemScore}</span>
                                    </div>

                                    {/* Coin Stat */}
                                    <div className="flex items-center gap-1.5">
                                        <div
                                            className="flex h-4 w-4 items-center justify-center rounded-full bg-yellow-500">
                                            <Coins size={8} className="text-white fill-white"/>
                                        </div>
                                        <span>{coinScore}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Request Button */}
                        <button
                            className="rounded-lg border border-[#2A4A75] bg-[#162A45]/50 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-[#0098EA] hover:border-[#0098EA] active:scale-95 whitespace-nowrap">
                            Request Game
                        </button>
                    </div>
                ))}
            </div>
        </main>
    );
}
