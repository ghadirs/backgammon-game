"use react"
import React from 'react';
import {Gamepad, Home, User2, Users, Wallet} from "lucide-react";

const BottomNavbar: React.FC<{}> = () => {
    return (
        <nav className="w-full flex justify-center pb-0 z-10">
            <div
                className="flex items-center gap-10 px-8 py-3 bg-[#0d1b30]/90 backdrop-blur-md rounded-t-2xl border-t border-x border-[#1A3150] shadow-lg">

                <div className="flex flex-col items-center gap-1 cursor-pointer group">
                    <Home className="fas fa-home text-gray-400 text-lg group-hover:text-white transition-colors"></Home>
                    <span
                        className="text-[9px] uppercase tracking-wider text-gray-400 font-medium group-hover:text-white">Lobbey</span>
                </div>

                <div className="flex flex-col items-center gap-1 cursor-pointer group">
                    <Gamepad
                        className="fas fa-gamepad text-gray-400 text-lg group-hover:text-white transition-colors"></Gamepad>
                    <span
                        className="text-[9px] uppercase tracking-wider text-gray-400 font-medium group-hover:text-white">Mini Game</span>
                </div>

                <div className="flex flex-col items-center gap-1 cursor-pointer group">
                    <Users
                        className="fas fa-user-friends text-gray-400 text-lg group-hover:text-white transition-colors"/>
                    <span
                        className="text-[9px] uppercase tracking-wider text-gray-400 font-medium group-hover:text-white">Friends</span>
                </div>

                <div className="flex flex-col items-center gap-1 cursor-pointer group">
                    <Wallet
                        className="fas fa-wallet text-gray-400 text-lg group-hover:text-white transition-colors"></Wallet>
                    <span
                        className="text-[9px] uppercase tracking-wider text-gray-400 font-medium group-hover:text-white">Wallet</span>
                </div>

            </div>
        </nav>
    )
}

export default BottomNavbar;