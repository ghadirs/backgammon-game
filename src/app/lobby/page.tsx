'use react'
import React from 'react';
import './lobby.module.scss'
import {ChevronRight} from "lucide-react";

function LobbyPage() {
    return (
        <main className="flex-1 w-full px-6 flex gap-4 items-center justify-center mt-2">

            <div
                className="game-card relative group w-1/3 h-[140px] rounded-xl overflow-hidden cursor-pointer shadow-lg border border-transparent hover:border-[#1A3150]">
                <img
                    src="https://images.unsplash.com/photo-1522069213448-443a614da9b6?q=80&w=600&auto=format&fit=crop"
                    className="w-full h-full object-cover" alt="Backgammon Board"/>
                <div
                    className="absolute bottom-0 w-full h-[36px] bg-card-overlay backdrop-blur-sm flex justify-between items-center px-3 border-t border-white/10">
                    <span className="text-white text-xs font-light">Play Now! - SINGLE</span>
                    <ChevronRight
                        className="fas fa-chevron-right text-gray-400 text-xs group-hover:text-white transition-colors"/>
                </div>
            </div>

            <div
                className="game-card relative group w-1/3 h-[140px] rounded-xl overflow-hidden cursor-pointer shadow-lg border border-transparent hover:border-[#1A3150]">
                <img
                    src="https://images.unsplash.com/photo-1522069213448-443a614da9b6?q=80&w=600&auto=format&fit=crop"
                    className="w-full h-full object-cover" alt="Online Play"/>
                <div
                    className="absolute bottom-0 w-full h-[36px] bg-card-overlay backdrop-blur-sm flex justify-between items-center px-3 border-t border-white/10">
                    <span className="text-white text-xs font-light">Play Now! - Online</span>
                    <ChevronRight
                        className="fas fa-chevron-right text-gray-400 text-xs group-hover:text-white transition-colors"/>
                </div>
            </div>

            <div
                className="game-card relative group w-1/3 h-[140px] rounded-xl overflow-hidden cursor-pointer shadow-lg border border-transparent hover:border-[#1A3150]">
                <img
                    src="https://images.unsplash.com/photo-1522069213448-443a614da9b6?q=80&w=600&auto=format&fit=crop"
                    className="w-full h-full object-cover" alt="Private Game"/>
                <div
                    className="absolute bottom-0 w-full h-[36px] bg-card-overlay backdrop-blur-sm flex justify-between items-center px-3 border-t border-white/10">
                    <span className="text-white text-xs font-light">Play private Game</span>
                    <ChevronRight
                        className="fas fa-chevron-right text-gray-400 text-xs group-hover:text-white transition-colors"/>
                </div>
            </div>
        </main>
    )
}

export default LobbyPage;