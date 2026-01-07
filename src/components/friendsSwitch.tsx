"use client";

import React from "react";
import { User, UserPlus, UserCheck } from "lucide-react";
import { FriendsTabOption } from "@/types/friends.ts";

interface FriendsSwitchProps {
  activeTab: FriendsTabOption;
  setActiveTab: (tab: FriendsTabOption) => void;
}

export default function FriendsSwitch({
  activeTab,
  setActiveTab,
}: FriendsSwitchProps) {
  // Configuration for the tabs based on the image
  const tabs = [
    {
      id: "friends" as FriendsTabOption,
      label: "Friends",
      icon: User,
    },
    {
      id: "requests" as FriendsTabOption,
      label: "Requests",
      icon: UserCheck,
    },
    {
      id: "suggests" as FriendsTabOption,
      label: "Suggests",
      icon: UserPlus,
    },
  ] as const;

  return (
    // Main Container - dark background with rounded corners
    <div className='relative flex h-[40px] w-full max-w-[320px] items-center rounded-lg bg-[#09152A]/80 p-1'>
      {tabs.map((tab, idx) => {
        const isActive = activeTab === tab.id;
        const isFirst = idx === 0;
        const isLast = idx === tabs.length - 1;

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              relative z-10 flex flex-1 items-center justify-center gap-2 p-1 text-sm font-medium text-white transition-all duration-300
              ${isFirst ? "rounded-l-md" : ""}
              ${isLast ? "rounded-r-md" : ""}
              ${
                isActive
                  ? "bg-[#1A3150]"
                  : "hover:bg-[#09152A]/60 cursor-pointer"
              }
            `}
          >
            {/* Icon */}
            <tab.icon size={16} className='text-white' strokeWidth={2} />

            {/* Label */}
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
