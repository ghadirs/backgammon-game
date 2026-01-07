"use client";

import * as React from "react";
import { Gem } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import chessImg from "@/assets/images/wallet/diamond-chest.png";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ItemCardProps {
  amount?: string;
  price?: string;
  imageUrl?: string | StaticImageData;
  onClick?: () => void;
  className?: string;
}

export function ItemCard({
  amount = "1,000",
  price = "1.19 Ton",
  imageUrl,
  onClick,
  className,
}: ItemCardProps) {
  const defaultImage = imageUrl || chessImg;

  return (
    <Card
      variant="item"
      onClick={onClick}
      className={cn(
        "group relative flex h-60 w-full max-w-50 flex-col items-center justify-between overflow-hidden rounded-md backdrop-blur-xs",
        className
      )}
    >
      {/* Top Hanging Tab (Amount) */}
      <div className="absolute top-0 z-10 flex h-6 w-[80px] items-center justify-center rounded-b-2xl border-b border-x border-[#1A3150] bg-[#09152A]/60 backdrop-blur-xs">
        <span className="text-[11px] font-semibold text-white tracking-wide">
          {amount}
        </span>
      </div>

      {/* Central Image Area */}
      <div className="flex h-full w-full flex-col items-center justify-center pt-8 pb-2">
        {/* Glow Effect behind the image */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-20 w-20 rounded-full bg-yellow-500/10 blur-xs" />

        {/* Image */}
        <div className="relative z-0 h-24 w-24 transition-transform duration-300 group-hover:scale-110">
          <Image
            src={defaultImage}
            alt="Item"
            className="h-full w-full object-contain drop-shadow-lg"
            width={96}
            height={96}
          />
        </div>
      </div>

      {/* Bottom Price Section */}
      <div className="relative w-full border-t border-[#1A3150] bg-[#09152A]/20 py-3">
        <div className="flex items-center justify-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0098EA] shadow-[0_0_10px_rgba(0,152,234,0.4)]">
            <Gem
              size={12}
              className="text-white fill-white translate-y-[1px]"
            />
          </div>
          <span className="text-lg font-medium text-white">{price}</span>
        </div>
      </div>
    </Card>
  );
}

