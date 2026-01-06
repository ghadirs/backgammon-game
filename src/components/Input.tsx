"use client";

import React from "react";
import { Gem } from "lucide-react";

interface InputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  placeholder?: string;
  isLoading?: boolean;
  buttonLabel?: string;
  icon?: React.ReactNode;
  className?: string;
}

export default function Input({
  value,
  onChange,
  onSubmit,
  placeholder = "Enter amount of ton...",
  isLoading = false,
  buttonLabel,
  icon,
  className,
}: InputProps) {
  return (
    // Main Container: Glassmorphism, Rounded, Border
    <div
      className={
        className +
        " group relative flex w-full max-w-[516px] h-12 items-center rounded-xl border border-[#1A3150] bg-[#09152A]/35 backdrop-blur-md transition-all hover:border-[#2a4a75]"
      }
    >
      {/* Input Field (Left Side) */}
      <input
        type="text" // Change to "number" if you want strict number input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={
          " h-full flex-grow bg-transparent px-5 text-sm font-medium text-white placeholder-white/50 outline-none transition-colors"
        }
      />

      {/* Action Button (Right Side) */}
      {buttonLabel !== "" && (
        <>
          {/* Separator Line (Visual Divider) */}
          <div className="h-full w-[1px] bg-[#1A3150]" />
          <button
            onClick={onSubmit}
            disabled={isLoading}
            className="relative flex h-full min-w-[126px] items-center justify-center gap-2 rounded-r-xl bg-[#09152A]/20 px-4 transition-all hover:bg-[#1A3150]/80 active:bg-[#09152A] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {icon}
            {/* Button Text */}
            <span className="text-sm font-medium text-white">
              {isLoading ? "Sending..." : buttonLabel}
            </span>
          </button>
        </>
      )}
    </div>
  );
}
