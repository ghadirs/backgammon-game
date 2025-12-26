import React from 'react';
import {useRouter} from 'next/navigation';
import {useGameStore} from '@/store/useGameStore';

const navItems = [
    {id: 'lobby', label: 'LOBBY', icon: '🏠'},
    {id: 'mini', label: 'MINI GAME', icon: '🎲'},
    {id: 'friends', label: 'FRIENDS', icon: '👥'},
    {id: 'wallet', label: 'WALLET', icon: '💼'},
];

export const BottomNav: React.FC = () => {
    const router = useRouter();
    // In a real app, track active route here

    return (
        <div
            className="fixed bottom-0 left-0 w-full bg-[#1a1a1a]/90 backdrop-blur-md border-t border-gray-800 pb-safe pt-2 z-50">
            <div className="flex justify-around items-center max-w-md mx-auto h-16">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => router.push(item.id === 'lobby' ? '/' : `/${item.id}`)}
                        className="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-white transition-colors gap-1"
                    >
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-[10px] font-bold tracking-wider">{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};