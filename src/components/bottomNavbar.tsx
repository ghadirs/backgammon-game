"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, Users, Wallet } from "lucide-react";

const BottomNavbar: React.FC<{}> = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/main") return pathname === "/main";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav
      aria-label='Primary'
      className='fixed bottom-0 left-1/2 z-20 w-full -translate-x-1/2 pb-0'
    >
      {/*
        Refactored the navigation items to use a map.
      */}
      <ul className='mx-auto grid h-[51px] w-[340px] max-w-[95vw] grid-cols-4 overflow-hidden rounded-tl-[25px] rounded-tr-[25px] bg-[#283852] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]'>
        {[
          {
            key: "lobby",
            href: "/lobby",
            label: "LOBBEY",
            icon: <Home size={18} strokeWidth={2} className='text-white' />,
          },
          {
            key: "friends",
            href: "/main/friends",
            label: "FRIENDS",
            icon: <Users size={18} strokeWidth={2} className='text-white' />,
          },
          {
            key: "wallet",
            href: "/main/wallet",
            label: "WALLET",
            icon: <Wallet size={18} strokeWidth={2} className='text-white' />,
          },
          {
            key: "profile",
            href: "/main",
            label: "PROFILE",
            icon: <User size={18} strokeWidth={2} className='text-white' />,
          },
        ].map((item, idx) => {
          const active = isActive(item.href);

          // Apply rounded corners to the first and last item
          const roundedClass =
            idx === 0
              ? "rounded-tl-[25px]"
              : idx === 3
              ? "rounded-tr-[25px]"
              : "";

          const baseClass = [
            "flex h-full w-full flex-col items-center pt-[6px] text-white transition-colors box-border",
            roundedClass,
            active
              ? "bg-gradient-to-t from-[#00CCFF]/50 to-[#00CCFF]/50 border-4 border-[#00CCFF] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
              : "bg-transparent border-4 border-transparent opacity-60 hover:opacity-80",
          ].join(" ");

          return (
            <li className='h-full w-full' key={item.key}>
              <Link href={item.href} className={baseClass}>
                {item.icon}
                <span className='mt-auto pb-[6px] text-center text-[14px] font-normal leading-[17px]'>
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default BottomNavbar;
