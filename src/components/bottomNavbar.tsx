"use react";
import React from "react";
import Link from "next/link";
import {Gamepad, Home, Users, Wallet} from "lucide-react";

const BottomNavbar: React.FC<{}> = () => {
    return (
        <nav className="w-full flex justify-center pb-0 z-10">
            <div
                className="flex items-center gap-10 px-8 py-3 bg-[#0d1b30]/90 backdrop-blur-md rounded-t-2xl border-t border-x border-[#1A3150] shadow-lg">
                <Link
                    href="/lobby"
                    className="flex flex-col items-center gap-1 cursor-pointer group"
                >
                    <Home
                        className="fas fa-home text-white font-light text-lg group-hover:text-gray-400 transition-colors"></Home>
                    <span
                        className="text-[9px] uppercase tracking-wider text-white font-light group-hover:text-gray-400">
            Lobbey
          </span>
                </Link>

                <Link
                    href="/gameplay"
                    className="flex flex-col items-center gap-1 cursor-pointer group"
                >
                    <Gamepad
                        className="fas fa-gamepad text-white font-light text-lg group-hover:text-gray-400 transition-colors"></Gamepad>
                    <span
                        className="text-[9px] uppercase tracking-wider text-white font-light font-medium group-hover:text-gray-400">
            Mini Game
          </span>
                </Link>

                <Link
                    href="/main/friends"
                    className="flex flex-col items-center gap-1 cursor-pointer group"
                >
                    <Users
                        className="fas fa-user-friends text-white font-light text-lg group-hover:text-gray-400 transition-colors"/>
                    <span
                        className="text-[9px] uppercase tracking-wider text-white font-light font-medium group-hover:text-gray-400">
            Friends
          </span>
                </Link>

                <Link
                    href="/main/wallet"
                    className="flex flex-col items-center gap-1 cursor-pointer group"
                >
                    <Wallet
                        className="fas fa-wallet text-white font-light text-lg group-hover:text-gray-400 transition-colors"></Wallet>
                    <span
                        className="text-[9px] uppercase tracking-wider text-white font-light font-medium group-hover:text-gray-400">
            Wallet
          </span>
                </Link>
            </div>
        </nav>
    );
};

export default BottomNavbar;
