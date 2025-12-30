import React from "react";
import { Crown } from "lucide-react";

interface ButtonProps {
  icon?: React.ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
}

export default function Button({
  icon,
  label,
  onClick,
  className,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`group flex h-12 min-w-[160px] items-center justify-center gap-3 rounded-xl border border-[#1A3150] bg-[#09152A]/60 px-8 transition-all hover:bg-[#1A3150] hover:shadow-lg active:scale-95 ${className}`}
    >
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-b from-yellow-400 to-yellow-600">
        {icon}
      </div>
      <span className="text-sm font-medium uppercase tracking-wide text-white">
        {label}
      </span>
    </button>
  );
}
