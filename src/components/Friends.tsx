"use client";
import {X} from 'lucide-react';

export function Friends() {
    return (
        <div className="p-6 h-full flex flex-col bg-[#09152a]/35 border border-[#1a3150] rounded-[12px]">
            <div className="flex justify-between items-center mb-4 border-b-4 p-3">
                <h2 className="text-white ml-auto mr-auto font-['Strong'] text-2xl uppercase">Friends</h2>
                <button
                    className="w-9 h-9  rounded-[12px] flex items-center justify-center">
                    <X size={20} className="text-[#FF2428]"/>
                </button>
            </div>

            {/* Scrollable Friends List (Horizontal) */}
            <div className="flex flex-col gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {[0, 1, 2, 3, 4].map((index) => (
                    <FriendItem key={index}/>
                ))}
            </div>
        </div>
    );
}

function FriendItem() {
    return (
        <div
            className="min-w-[140px] p-4 grid grid-cols-6 grid-rows-2 gap-2 transition-all hover:bg-[#1a3150]/50">
            <div className="w-12 h-12 row-span-2 row-start-1 relative">
                <img src="/lobby/Polygon-1.png" className="w-full h-full" alt="Avatar"/>
            </div>
            <span
                className="text-white row-start-1 justify-start text-start text-xs font-['Strong'] text-center">🇮🇹 Taylor Swift</span>

            <div className="flex items-center row-start-2 justify-start justify-end gap-1 text-[10px] text-white/70">
                <img src="/lobby/Diamond-1.png" className="w-3 h-3" alt="icon"/>
                <span>2.7B</span>
            </div>

            <button
                className="mt-2 col-start-6 w-full py-1 bg-blue-500/20 border border-blue-500/50 rounded-[6px] text-[10px] text-white uppercase font-bold hover:bg-blue-500/40">
                Request
            </button>
        </div>
    );
}