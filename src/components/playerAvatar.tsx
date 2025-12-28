import React from "react";
import Image from "next/image";

interface PlayerAvatarProps {
  name: string;
  balance: string;
  flag: string;
  image: string;
  color?: "blue" | "red" | "purple";
  align?: "left" | "right";
}

const PlayerAvatarComponent = ({
  name,
  balance,
  flag,
  image,
  color = "blue",
  align = "left",
}: PlayerAvatarProps) => {
  const colorMap = {
    blue: "accent-blue",
    red: "accent-red",
    purple: "purple-500",
  };

  const alignClass = align === "left" ? "items-start" : "items-end";

  const hexagonBgColor = {
    blue: "bg-accent-blue",
    red: "bg-accent-red",
    purple: "bg-purple-500",
  };

  return (
    <div className={`flex flex-col ${alignClass} gap-3`}>
      {/* Hexagon Avatar */}
      <div className={`relative w-20 h-24 rounded-lg overflow-hidden border-2 border-${colorMap[color]} flex items-center justify-center`}>
        <div className={`absolute inset-0 ${hexagonBgColor[color]} opacity-20`} />
        <Image
          src={image}
          alt={`${name}'s avatar`}
          width={78}
          height={88}
          className="w-full h-full object-cover"
          priority={false}
        />
      </div>

      {/* Player Info */}
      <div className={`flex flex-col ${align === "left" ? "items-start" : "items-end"}`}>
        {/* Name Row */}
        <div className="flex items-center gap-2">
          <span className="text-xl" role="img" aria-label={`Country flag: ${flag}`}>
            {flag}
          </span>
          <span className="text-white font-bold text-sm">{name}</span>
        </div>

        {/* Balance Row */}
        <div className="flex items-center gap-1 mt-1">
          <span className="text-lg" role="img" aria-label="Gem currency">
            💎
          </span>
          <span className="text-accent-cyan font-bold text-xs">{balance}</span>
        </div>
      </div>
    </div>
  );
};

export default PlayerAvatarComponent;
