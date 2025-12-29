"use client"
import React from 'react';
import {CoinsIcon, CrownIcon, GemIcon} from "lucide-react";


const TopNavbar = (() => {
    return (
        <header className="relative w-full h-[60px] flex items-start justify-between px-6 pt-5 z-20">

            <div className="flex items-center gap-4">
                <div
                    className="bg-[#0b172a]/80 border border-[#1A3150] rounded-lg px-3 py-1 flex items-center gap-2 h-[32px]">
                    <div
                        className="w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(6,182,212,0.6)]">
                        <GemIcon className="fas fa-gem text-[10px] text-white"/>
                    </div>
                    <span className="text-white text-sm font-light">32.67</span>
                </div>

                <div className="flex items-center gap-2 cursor-pointer group">
                    <CrownIcon
                        className="fas fa-crown text-amber-500 text-lg drop-shadow-md group-hover:scale-110 transition-transform"></CrownIcon>
                    <span className="text-gray-300 text-sm font-medium tracking-wide">GET PRO</span>
                </div>
            </div>

            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#12233f] px-8 py-2 rounded-b-[24px] border-b border-x border-[#1A3150] shadow-lg flex items-center gap-3 h-[50px]">
                <div className="relative">
                    <img src="https://i.pravatar.cc/150?u=swift" alt="Profile"
                         className="w-8 h-8 rounded-full border border-pink-400 object-cover"/>
                    <div
                        className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-[#12233f]"></div>
                </div>
                <span className="text-white font-light text-sm tracking-wide">Taylor Swift</span>
            </div>

            <div
                className="bg-[#0b172a]/80 border border-[#1A3150] rounded-lg px-3 py-1 flex items-center gap-2 h-[32px]">
                <div
                    className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(245,158,11,0.6)]">
                    <CoinsIcon className="fas fa-coins text-[10px] text-white"></CoinsIcon>
                </div>
                <span className="text-white text-sm font-light tracking-wide">1,000,000,000</span>
            </div>
        </header>
    )
})

export default TopNavbar