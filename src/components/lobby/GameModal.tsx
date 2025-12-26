'use client';

import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import {useGameStore} from '@/store/useGameStore';
import {X} from 'lucide-react';
import {GameMode} from '@/types';

interface GameModalProps {
    mode: GameMode;
    onClose: () => void;
}

export const GameModal: React.FC<GameModalProps> = ({mode, onClose}) => {
    const {startGame, balance} = useGameStore();
    const router = useRouter();

    // Config based on Figma screenshots
    const isOnline = mode === 'ONLINE';
    const title = isOnline ? 'PLAY ONLINE' : 'PLAY SINGEL';
    const actionLabel = isOnline ? 'LAUNCH' : 'Continue';
    const assetIcon = isOnline ? '/ton.png' : '/Point.png';
    const bets = isOnline ? [1, 5] : [100, 200, 500, 1000];

    const [selectedBet, setSelectedBet] = useState<number>(bets[0]);

    const handleAction = () => {
        if (balance < selectedBet) {
            alert("Insufficient balance!");
            return;
        }
        startGame(mode, selectedBet);
        router.push('/game');
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
            {/* Rectangle 7: Modal Container */}
            <div
                className="relative w-[560px] h-[247px] bg-[#09152a]/35 border border-[#1A3150] backdrop-filter backdrop-blur-[10px] rounded-[12px] flex flex-col shadow-2xl">

                {/* Header Section */}
                <div className="relative h-[65px] flex items-center px-8 border-b border-[#1A3150]/50">
                    <h2 className="text-white text-2xl font-normal tracking-tight uppercase font-['Strong']">
                        {title}
                    </h2>

                    {/* Rectangle 6 + Exit Icon */}
                    <button
                        onClick={onClose}
                        className="absolute right-6 top-4 w-9 h-9 bg-[#09152a]/35 border border-[#1A3150] rounded-[12px] flex items-center justify-center hover:bg-red-500/20 transition-all"
                    >
                        <div className="w-5 h-5 bg-[#FF2428] rounded-[4px] flex items-center justify-center">
                            <X size={14} strokeWidth={3} className="text-[#09152a]"/>
                        </div>
                    </button>
                </div>

                {/* Body: Bet Selection (Group 65) */}
                <div className="flex-1 flex flex-col items-center justify-center gap-6">
                    <div className="flex gap-4">
                        {bets.map((bet) => (
                            <button
                                key={bet}
                                onClick={() => setSelectedBet(bet)}
                                className={`w-[65px] h-[48px] bg-[#09152a]/35 border transition-all rounded-[12px] flex items-center justify-center ${
                                    selectedBet === bet
                                        ? 'border-blue-400 bg-blue-500/20 shadow-[0_0_15px_rgba(34,200,242,0.2)]'
                                        : 'border-[#1A3150]'
                                }`}
                            >
                                <div className="flex items-center gap-1.5">
                                    <img src={assetIcon} alt="currency" className="w-5 h-5 object-contain"/>
                                    {isOnline && <span className="text-sm font-bold text-white">{bet}</span>}
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Rectangle 9: Action Button */}
                    <button
                        onClick={handleAction}
                        className="w-[113px] h-[48px] bg-[#09152a]/35 border border-[#1A3150] hover:border-blue-400 hover:bg-blue-500/10 rounded-[12px] flex items-center justify-center gap-2 transition-all active:scale-95"
                    >
                        {!isOnline && <img src={assetIcon} alt="currency" className="w-4 h-4"/>}
                        <span className="text-white text-sm font-normal font-['Strong'] uppercase tracking-wider">
                            {actionLabel}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};