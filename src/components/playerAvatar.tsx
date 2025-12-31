import React from "react";

interface PlayerAvatarProps {
  name: string;
  balance: string;
  flag: string; // e.g., "🇮🇹"
  image: string;
  color: string;
  align?: "left" | "right";
}
const HEX_CLIP =
  "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

const PlayerAvatar = ({
  name,
  balance,
  flag,
  image,
  color,
  align = "left",
}: PlayerAvatarProps) => {
  return (
    <div
      className={`flex flex-col gap-3 ${align === "right" ? "items-end" : "items-center"}`}
    >
      {/* Outer Hexagon (Stroke) */}
      <div
        style={{ clipPath: HEX_CLIP }}
        className={`w-[78px] h-[88px] flex items-center justify-center ${
          color === "red" ? "bg-[#e53e3e]" : "bg-[#3182ce]"
        }`}
      >
        {/* Inner Hexagon (Hole/Background) */}
        <div
          style={{ clipPath: HEX_CLIP }}
          className="w-[calc(100%-4px)] h-[calc(100%-4px)] bg-black flex items-center justify-center"
        >
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Meta Info */}
      <div className="flex flex-col gap-[2px]">
        {/* Name Row - Reverses order if align is 'right' */}
        <div
          className={`flex items-center gap-[6px] text-white text-sm font-medium ${
            align === "right" ? "flex-row-reverse" : "flex-row"
          }`}
        >
          <span>{flag}</span>
          <span className="leading-none">{name}</span>
        </div>

        {/* Balance Row */}
        <div className="flex items-center justify-center gap-1 text-[#4da3ff] text-xs font-bold">
          <span className="text-[10px]">💎</span>
          <span className="leading-none">{balance}</span>
        </div>
      </div>
    </div>
  );
};

export default PlayerAvatar;
