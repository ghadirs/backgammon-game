"use client";
import React from 'react';
import {X, Wallet as WalletIcon, ArrowDownCircle} from 'lucide-react';

export function Wallet() {
    return (
        <div className="flex flex-col items-center justify-center h-full w-full p-6 relative z-50">
            {/* Header Area */}
            <div className="w-full max-w-[560px] flex justify-between items-center mb-4">
                <h2 className="text-white font-['Strong'] text-2xl uppercase tracking-wider">Wallet</h2>
                <button
                    className="w-9 h-9 bg-[#09152a]/35 border border-[#1a3150] rounded-[12px] flex items-center justify-center hover:bg-red-500/20 transition-colors">
                    <X size={20} className="text-[#FF2428]"/>
                </button>
            </div>

            {/* Main Content Card */}
            <div
                className="w-full max-w-[560px] bg-[#09152a]/35 backdrop-blur-md border border-[#1a3150] rounded-[12px] p-6 flex flex-col gap-6">

                {/* Switcher: Points vs Toncoin */}
                <div className="flex bg-[#09152a]/50 border border-[#1a3150] rounded-[8px] p-1">
                    <button
                        className="flex-1 flex items-center justify-center gap-2 py-2 bg-[#248ddc]/35 rounded-[6px] transition-all">
                        <img src="lobby/Energy.png" className="w-5 h-5" alt="Points"/>
                        <span className="text-white text-sm font-['Strong']">Points</span>
                    </button>
                    <button
                        className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-white/5 rounded-[6px] transition-all">
                        <img src="lobby/Diamond-1.png" className="w-5 h-5" alt="Toncoin"/>
                        <span className="text-white/60 text-sm font-['Strong']">Toncoin</span>
                    </button>
                </div>

                {/* Input Area */}
                <div className="flex flex-col gap-2">
                    <label className="text-white/50 text-[12px] font-['Strong'] ml-1">AMOUNT TO DEPOSIT</label>
                    <div className="relative">
                        <input
                            type="number"
                            placeholder="Enter amount of ton..."
                            className="w-full bg-[#09152a]/50 border border-[#1a3150] rounded-[12px] py-3 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 transition-all"
                        />
                        <img src="/wallet/toncoin.png" className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5"
                             alt="ton"/>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                    <button
                        className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-['Strong'] py-3 rounded-[8px] flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/20">
                        <ArrowDownCircle size={18}/>
                        DEPOSIT NOW
                    </button>
                    <button
                        className="flex-1 bg-[#09152a]/80 border border-[#1a3150] hover:bg-[#1a3150] text-white font-['Strong'] py-3 rounded-[8px] flex items-center justify-center gap-2 transition-all">
                        <WalletIcon size={18}/>
                        CONNECT WALLET
                    </button>
                </div>
            </div>

            {/* Decorative Divider Line (Horizontal in Landscape) */}
            <div
                className="absolute bottom-[-10px] w-[80%] h-[1px] bg-gradient-to-r from-transparent via-[#1a3150] to-transparent"/>
        </div>
    );
}