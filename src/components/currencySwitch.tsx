"use client";

import React from "react";
import { Crown, Gem } from "lucide-react";
import { TabOption } from "@/types/wallet.ts";

interface CurrencySwitchProps {
  activeTab: TabOption;
  setActiveTab: (tab: TabOption) => void;
}

export default function CurrencySwitch({
  activeTab,
  setActiveTab,
}: CurrencySwitchProps) {
  // Configuration for the tabs to keep JSX clean
  const tabs = [
    {
      id: "points",
      label: "Points",
      icon: Crown,
      iconColor: "text-yellow-100", // Icon inner color
      bgColor: "bg-yellow-600", // Coin circle color
      borderColor: "border-yellow-400",
    },
    {
      id: "deposit",
      label: "Deposit",
      icon: Gem,
      iconColor: "text-white",
      bgColor: "bg-[#0098EA]", // TON Blue
      borderColor: "border-[#0098EA]",
    },
    {
      id: "withdraw",
      label: "Withdraw",
      icon: Gem,
      iconColor: "text-white",
      bgColor: "bg-[#0098EA]",
      borderColor: "border-[#0098EA]",
    },
  ] as const;

  return (
    // Main Container (Rectangle 6)
    <div className="relative flex h-[40px] w-full max-w-[280px] items-center rounded-lg border border-[#1A3150] bg-[#09152A]/50 p-1 backdrop-blur-md">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabOption)}
            className={`
              relative z-10 flex flex-1 items-center justify-center gap-2 rounded-md p-1 text-sm font-medium transition-all duration-300
              ${isActive ? "text-white" : "text-slate-400 hover:text-slate-200 cursor-pointer"}
            `}
          >
            {/* Active Background Layer (Sliding visual) */}
            {isActive && (
              <div className="absolute inset-0 -z-10 rounded-md bg-[#248DDC]/35 shadow-[inset_0_0_15px_rgba(0,0,0,0.25)] border border-[#1A3150]" />
            )}

            {/* Icon Circle (Coin simulation) */}
            <div
              className={`
              flex h-5 w-5 items-center justify-center rounded-full border shadow-sm
              ${tab.bgColor} ${tab.borderColor}
            `}
            >
              <tab.icon size={10} className={tab.iconColor} strokeWidth={3} />
            </div>

            {/* Label */}
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
