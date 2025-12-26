"use client";
import React from 'react';
import {ChevronRight} from 'lucide-react';

const GameCard = ({title, image}: { title: string; image: string }) => (
    /* Removed all rotation classes here */
    <div className="relative w-[240px] h-[195px] flex-shrink-0 cursor-pointer group">
        <div className="h-[145px] w-full rounded-t-[12px] overflow-hidden border-x border-t border-[#1a3150]">
            <img src={image} alt={title} className="w-full h-full object-cover"/>
        </div>
        <div
            className="h-[50px] w-full bg-[#1A3150]/70 backdrop-blur-md rounded-b-[12px] border-x border-b border-[#1a3150] flex items-center justify-between px-4">
            <span className="text-white text-[16px]">{title}</span>
            <div
                className="w-[28px] h-[28px] bg-[#09152a]/50 border border-[#1a3150] rounded-[6px] flex items-center justify-center">
                <ChevronRight size={16} className="text-white"/>
            </div>
        </div>
    </div>
);

export function Lobby() {
    return (
        /* Changed from absolute positioning to flex-row */
        <div className="w-full h-full flex flex-row items-center justify-center gap-6 p-4">
            <GameCard title="SINGEL" image="/lobby/backgammonimage.png"/>
            <GameCard title="Online" image="/lobby/backgammonimage.png"/>
            <GameCard title="Private" image="/lobby/diceimage.png"/>
        </div>
    );
}