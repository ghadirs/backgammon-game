"use client";

import React from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {Home, User, Users, Wallet} from "lucide-react";

const BottomNavbar: React.FC<{}> = () => {
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        if (href === "/main") return pathname === "/main";
        return pathname === href || pathname.startsWith(`${href}/`);
    };

    return (
        <nav
            aria-label="Primary"
            className="fixed bottom-0 left-1/2 z-20 w-full -translate-x-1/2 pb-0"
        >
            <ul
                className="mx-auto grid h-[51px] w-[340px] max-w-[95vw] grid-cols-4 overflow-hidden rounded-tl-[25px] rounded-tr-[25px] bg-black shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
            >
                {/* Active (Lobby) */}
                <li className="h-full w-full">
                    <Link
                        href="/lobby"
                        className={[
                            "flex h-full w-full flex-col items-center bg-gradient-to-t from-[#00CCFF]/50 to-[#00CCFF]/50 pt-[6px] text-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] transition-colors rounded-tl-[25px] box-border border-bottom-transparent",
                            isActive("/lobby") ? "border-2 border-[#00CCFF]" : "border-2 border-transparent",
                        ].join(" ")}
                    >
                        <Home size={18} strokeWidth={2} className="text-white" />
                        <span className="mt-auto pb-[6px] text-center text-[14px] font-normal leading-[17px]">
                            LOBBEY
                        </span>
                    </Link>
                </li>

                <li className="h-full w-full">
                    <Link
                        href="/main/friends"
                        className={[
                            "flex h-full w-full flex-col items-center pt-[6px] text-white transition-colors hover:text-gray-300 box-border",
                            isActive("/main/friends") ? "border-2 border-[#00CCFF]" : "border-2 border-transparent",
                        ].join(" ")}
                    >
                        <Users size={18} strokeWidth={2} className="text-current" />
                        <span className="mt-auto pb-[6px] text-center text-[14px] font-normal leading-[17px]">
                            FRIENDS
                        </span>
                    </Link>
                </li>

                <li className="h-full w-full">
                    <Link
                        href="/main/wallet"
                        className={[
                            "flex h-full w-full flex-col items-center pt-[6px] text-white transition-colors hover:text-gray-300 box-border",
                            isActive("/main/wallet") ? "border-2 border-[#00CCFF]" : "border-2 border-transparent",
                        ].join(" ")}
                    >
                        <Wallet size={18} strokeWidth={2} className="text-current" />
                        <span className="mt-auto pb-[6px] text-center text-[14px] font-normal leading-[17px]">
                            WALLET
                        </span>
                    </Link>
                </li>

                {/* Dark right segment */}
                <li className="h-full w-full">
                    <Link
                        href="/main"
                        className={[
                            "flex h-full w-full flex-col items-center bg-[#283852] pt-[6px] text-white transition-colors hover:text-gray-200 rounded-tr-[25px] box-border",
                            isActive("/main") ? "border-2 border-[#00CCFF]" : "border-2 border-transparent",
                        ].join(" ")}
                    >
                        <User size={18} strokeWidth={2} className="text-current" />
                        <span className="mt-auto pb-[6px] text-center text-[14px] font-normal leading-[17px]">
                            PROFILE
                        </span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default BottomNavbar;
