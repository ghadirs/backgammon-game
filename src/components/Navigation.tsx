"use client";
import React from 'react';
import {Home, Users, Wallet, Gamepad2} from 'lucide-react';

type NavigationProps = {
    currentScreen: 'lobby' | 'friends' | 'wallet';
    onScreenChange: (screen: 'lobby' | 'friends' | 'wallet') => void;
};

export function Navigation({currentScreen, onScreenChange}: NavigationProps) {
    const navItems = [
        {id: 'lobby' as const, label: 'LOBBY', icon: Home},
        {id: 'minigame' as const, label: 'MINI GAME', icon: Gamepad2, disabled: true},
        {id: 'friends' as const, label: 'FRIENDS', icon: Users},
        {id: 'wallet' as const, label: 'WALLET', icon: Wallet},
    ];

    return (
        <nav
            className="absolute bottom-0 left-0 w-full h-[70px] flex justify-center items-end pb-2 px-10 pointer-events-none">
            {/* Main Nav Container - No Rotation */}
            <div
                className="flex items-center bg-[#09152a]/60 backdrop-blur-xl border border-[#1a3150] rounded-t-[20px] px-8 h-[54px] pointer-events-auto shadow-2xl">

                {navItems.map((item, index) => {
                    const isActive = currentScreen === item.id;
                    const Icon = item.icon;

                    return (
                        <React.Fragment key={item.id}>
                            {/* Divider between items */}
                            {index !== 0 && (
                                <div
                                    className="w-[1px] h-8 bg-gradient-to-b from-transparent via-[#1a3150] to-transparent mx-4"/>
                            )}

                            <button
                                onClick={() => !item.disabled && onScreenChange(item.id as any)}
                                className={`flex items-center gap-2 transition-all duration-200 ${
                                    item.disabled ? 'opacity-30 cursor-not-allowed' : 'hover:scale-105'
                                }`}
                            >
                                <Icon
                                    size={20}
                                    className={isActive ? 'text-white' : 'text-gray-400'}
                                />
                                <span className={`text-[12px] font-['Strait'] tracking-widest ${
                                    isActive ? 'text-white font-bold' : 'text-gray-400'
                                }`}>
                                    {item.label}
                                </span>
                            </button>
                        </React.Fragment>
                    );
                })}
            </div>
        </nav>
    );
}