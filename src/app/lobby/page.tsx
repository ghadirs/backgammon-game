"use client"

import React from 'react';
import {Home, Gamepad2, Users, Wallet, ChevronRight, Settings, Crown, Zap, Diamond} from 'lucide-react';
import styles from './lobby.module.scss'

// Define these here locally so Tailwind definitely "sees" them
const NavItem = ({icon, label, active = false}: { icon: React.ReactNode; label: string; active?: boolean }) => (
    <div
        className={`${styles.wrapper} flex flex-1 flex-col items-center justify-center border-r border-[#1A3150] py-2 transition-colors last:border-r-0 hover:bg-white/5 ${active ? 'bg-cyan-500/10' : ''}`}>
        <div className={`${active ? 'text-cyan-400' : 'text-white/70'}`}>{icon}</div>
        <span className={`mt-1 text-[10px] font-bold tracking-widest ${active ? 'text-cyan-400' : 'text-white/70'}`}>
            {label}
        </span>
    </div>
);

const GameCard = ({title, imgUrl}: { title: string; imgUrl: string }) => (
    <div className="group w-64 flex-shrink-0 cursor-pointer transition-transform duration-300 hover:scale-105">
        <div className="h-36 overflow-hidden rounded-t-xl border border-[#1A3150] border-b-0">
            <img src={imgUrl} alt={title} className="h-full w-full object-cover"/>
        </div>
        <div
            className="flex items-center justify-between border border-[#1A3150] bg-[#1A3150]/70 p-3 backdrop-blur-md rounded-b-xl">
            <span className="text-sm font-medium text-white tracking-tight">{title}</span>
            <div
                className="rounded-md border border-[#1A3150] bg-[#09152A]/50 p-1 group-hover:bg-cyan-500 transition-colors">
                <ChevronRight size={16} className="text-white"/>
            </div>
        </div>
    </div>
);

export default function Lobby() {
    return (
        <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#09132A]">

            {/* Background Glows */}
            <div
                className="absolute -right-20 -top-20 h-40 w-[500px] rotate-12 rounded-full bg-cyan-500/20 blur-[100px]"/>
            <div
                className="absolute -left-20 bottom-20 h-40 w-[500px] rotate-12 rounded-full bg-red-500/10 blur-[100px]"/>

            {/* Main Game Interface Container */}
            <div
                className="relative z-10 flex aspect-[16/9] w-full max-w-5xl flex-col overflow-hidden rounded-[24px] border border-[#1A3150] bg-[#09152A]/60 shadow-2xl backdrop-blur-2xl">

                {/* --- Header Section --- */}
                <header className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-4">
                        <div
                            className="flex items-center rounded-lg border border-[#1A3150] bg-[#09152A]/40 pr-3 backdrop-blur-md">
                            <div className="mr-2 rounded-lg bg-[#1A3150]/60 p-2 text-cyan-400"><Diamond size={16}/>
                            </div>
                            <span className="text-sm font-bold text-white">32.67</span>
                        </div>
                        <button className="group flex items-center gap-2">
                            <div
                                className="rounded-xl border border-[#1A3150] bg-[#09152A]/40 p-2 group-hover:bg-[#1A3150] transition-colors">
                                <Crown size={16} className="text-orange-400 fill-orange-400"/>
                            </div>
                            <span className="text-xs font-black text-white">GET PRO</span>
                        </button>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                        <div className="h-10 w-10 rounded-xl border border-cyan-500/50 p-0.5 overflow-hidden">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor" alt="Avatar"
                                 className="h-full w-full rounded-lg bg-slate-800"/>
                        </div>
                        <span className="text-[11px] font-medium text-white">Taylor Swift</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <Settings className="cursor-pointer text-gray-400 hover:text-white" size={20}/>
                        <div
                            className="flex items-center rounded-lg border border-[#1A3150] bg-[#09152A]/40 pr-3 backdrop-blur-md">
                            <div className="mr-2 rounded-lg bg-[#1A3150]/60 p-2 text-yellow-500"><Zap size={16}
                                                                                                      fill="currentColor"/>
                            </div>
                            <span className="text-sm font-bold text-white">1,000,000,000</span>
                        </div>
                    </div>
                </header>

                {/* --- Body: Game Selection --- */}
                <main className="flex flex-1 flex-row items-center justify-center gap-8 px-10">
                    <GameCard title="Play Now! - SINGLE"
                              imgUrl="https://images.unsplash.com/photo-1589115712461-76678c187497?w=400"/>
                    <GameCard title="Play Now! - Online"
                              imgUrl="https://images.unsplash.com/photo-1589115712461-76678c187497?w=400"/>
                    <GameCard title="Play Private Game"
                              imgUrl="https://images.unsplash.com/photo-1589115712461-76678c187497?w=400"/>
                </main>

                {/* --- Footer: Navigation --- */}
                <footer className="flex justify-center">
                    <nav
                        className="flex w-full max-w-md items-center overflow-hidden rounded-t-2xl border-x border-t border-[#1A3150] bg-[#09152A]/40 backdrop-blur-md">
                        <NavItem icon={<Home size={18}/>} label="LOBBY" active/>
                        <NavItem icon={<Gamepad2 size={18}/>} label="MINI GAME"/>
                        <NavItem icon={<Users size={18}/>} label="FRIENDS"/>
                        <NavItem icon={<Wallet size={18}/>} label="WALLET"/>
                    </nav>
                </footer>
            </div>
        </div>
    );
}