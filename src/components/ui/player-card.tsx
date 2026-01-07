"use client";

import * as React from "react";
import Image, { StaticImageData } from "next/image";
import { Gem, Coins, Trash2, CheckCircle, UserPlus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PlayerCardProps {
  name: string;
  flagEmoji: string;
  gemScore: string;
  coinScore: string;
  avatarUrl: string | StaticImageData;
  rank?: number;
  onDelete?: () => void;
  onAction?: () => void;
  actionLabel?: string;
  actionIcon?: React.ReactNode;
  actionVariant?: "button" | "icon";
  className?: string;
}

export function PlayerCard({
  name,
  flagEmoji,
  gemScore,
  coinScore,
  avatarUrl,
  rank,
  onDelete,
  onAction,
  actionLabel = "Request Game",
  actionIcon,
  actionVariant = "button",
  className,
}: PlayerCardProps) {
  return (
    <Card
      variant="player"
      className={cn(
        "flex w-full items-center justify-between gap-4 p-1 transition-colors",
        className
      )}
    >
      {/* Left Side: Rank + Avatar + Info */}
      <div className="flex items-center gap-3">
        {/* Rank Badge (optional) */}
        {rank !== undefined && (
          <div className="flex h-5 w-5 items-center justify-center rounded-md border border-[#1A3150] bg-[#09152A]/50 backdrop-blur-xl">
            <span className="text-[10px] font-medium text-white">{rank}</span>
          </div>
        )}

        {/* Hexagon Avatar */}
        <div className="relative h-14 w-14 flex-shrink-0">
          {/* Border Shape */}
          <div
            className={cn(
              "absolute inset-0",
              rank !== undefined
                ? "bg-gradient-to-b from-[#6E78B3] to-[#6E78B3]"
                : "bg-gradient-to-b from-blue-500 to-blue-900"
            )}
            style={{
              clipPath:
                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            }}
          />
          {/* Image */}
          <Image
            src={avatarUrl}
            alt={name}
            className={cn(
              "absolute object-cover bg-slate-800",
              rank !== undefined
                ? "inset-[1px] h-[calc(100%-2px)] w-[calc(100%-2px)]"
                : "inset-[2px] h-[calc(100%-4px)] w-[calc(100%-4px)]"
            )}
            style={{
              clipPath:
                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            }}
            width={56}
            height={56}
          />
        </div>

        {/* Player Details */}
        <div className={cn("flex flex-col", rank !== undefined ? "gap-0.5" : "gap-1")}>
          {/* Name Row */}
          <div className="flex items-center gap-2">
            <span className={cn("leading-none", rank !== undefined ? "text-sm" : "text-lg")}>
              {flagEmoji}
            </span>
            <span
              className={cn(
                "font-medium text-white",
                rank !== undefined
                  ? "text-sm text-[#F3EDF7]"
                  : "text-base"
              )}
            >
              {name}
            </span>
          </div>

          {/* Stats Row */}
          <div
            className={cn(
              "flex items-center font-medium text-slate-300",
              rank !== undefined
                ? "gap-3 text-[10px] text-[#F3EDF7]"
                : "gap-4 text-xs"
            )}
          >
            {/* Gem Stat */}
            <div className="flex items-center gap-1.5">
              <div
                className={cn(
                  "flex items-center justify-center rounded-full bg-[#0098EA]",
                  rank !== undefined ? "h-2.5 w-2.5" : "h-4 w-4"
                )}
              >
                <Gem
                  size={rank !== undefined ? 6 : 8}
                  className="text-white fill-white"
                />
              </div>
              <span>{gemScore}</span>
            </div>

            {/* Coin Stat */}
            <div className="flex items-center gap-1.5">
              <div
                className={cn(
                  "flex items-center justify-center rounded-full bg-yellow-500",
                  rank !== undefined ? "h-2.5 w-2.5" : "h-4 w-4"
                )}
              >
                <Coins
                  size={rank !== undefined ? 6 : 8}
                  className="text-white fill-white"
                />
              </div>
              <span>{coinScore}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Action Buttons */}
      <div className="flex items-center gap-2">
        {/* Delete Icon Button (optional) */}
        {onDelete && (
          <button
            onClick={onDelete}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#0098EA] bg-[#162A45]/50 transition-all hover:bg-[#162A45]/80 active:scale-95"
          >
            <Trash2 size={16} className="text-red-500" />
          </button>
        )}

        {/* Action Button */}
        {onAction && (
          <>
            {actionVariant === "button" ? (
              <button
                onClick={onAction}
                className="rounded-lg border border-[#0098EA] bg-[#162A45]/50 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-[#0098EA] hover:border-[#0098EA] active:scale-95 whitespace-nowrap"
              >
                {actionLabel}
              </button>
            ) : (
              <button
                onClick={onAction}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#0098EA] bg-[#162A45]/50 transition-all hover:bg-[#162A45]/80 active:scale-95"
              >
                {actionIcon}
              </button>
            )}
          </>
        )}

        {/* Default Request Game Button (if no onAction provided) */}
        {!onAction && (
          <button
            className={cn(
              "rounded-lg border border-[#0098EA] bg-[#162A45]/50 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-[#0098EA] hover:border-[#0098EA] active:scale-95 whitespace-nowrap",
              rank !== undefined &&
                "rounded-md border-[#1A3150] bg-[#09152A]/50 px-3 py-1.5 text-[10px] font-medium backdrop-blur-xl hover:bg-[#09152A]/80"
            )}
          >
            {actionLabel}
          </button>
        )}
      </div>
    </Card>
  );
}

