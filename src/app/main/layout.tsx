"use client"

import {X} from "lucide-react";
import React from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function MainLayout({children}: { children: React.ReactNode }) {
    const path = usePathname();
    return (
        <>
            <div className="flex items-center justify-end border-b border-[#1A3150] py-1.5 px-2 ">
                <h2 className="text-2xl font-normal uppercase ml-auto mr-auto tracking-wide text-white">
                    {path == "/main/wallet" ? "WALLET" : "FRIENDS"}
                </h2>

                {/* Close Button */}
                <Link
                    href='/lobby'
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-900/50 bg-[#FF2428] text-white shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                >
                    <X size={20} strokeWidth={3}/>
                </Link>
            </div>
            {children}
        </>
    )
}