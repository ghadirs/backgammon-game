'use client';

import React, {useState} from 'react';
import {BottomNav} from '@/components/layout/BottomNav.tsx';
import {Button} from '@/components';
import {WalletOption} from '@/types';

const exchangeOptions: WalletOption[] = [
    {points: 1000, ton: '1.19', icon: '💰'},
    {points: 5000, ton: '2.99', icon: '💰'},
    {points: 25000, ton: '9.49', icon: '💰'},
    {points: 100000, ton: '19.99', icon: '💰'},
];

export default function WalletPage() {
    const [activeTab, setActiveTab] = useState<'Points' | 'Toncoin' | 'Withdraw'>('Points');

    return (
        <div className="min-h-screen bg-[#0f0f0f] text-white pb-24 font-sans">
            {/* Header */}
            <header className="p-6 flex justify-between items-center bg-[#1a1a1a]">
                <div className="text-2xl font-bold">Wallet</div>
                <Button variant="primary" className="!py-2 !px-4 !text-sm">CONNECT WALLET</Button>
            </header>

            {/* Tabs */}
            <div className="flex p-2 bg-[#1a1a1a] mx-6 mt-6 rounded-xl">
                {['Points', 'Toncoin', 'Withdraw'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                            activeTab === tab
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        {tab.toUpperCase()}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="p-6">
                {activeTab === 'Points' && (
                    <div className="grid grid-cols-2 gap-4">
                        {exchangeOptions.map((opt, idx) => (
                            <div
                                key={idx}
                                className="bg-[#1a1a1a] border border-gray-800 p-4 rounded-xl flex flex-col items-center hover:border-blue-500 transition-colors cursor-pointer group"
                            >
                                <div className="text-3xl mb-2">{opt.icon}</div>
                                <div className="text-white font-bold text-lg group-hover:text-blue-400">
                                    {opt.points.toLocaleString()}
                                </div>
                                <div
                                    className="text-yellow-500 text-sm font-bold bg-yellow-500/10 px-2 py-1 rounded mt-2">
                                    {opt.ton} TON
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'Toncoin' && (
                    <div className="mt-6">
                        <label className="text-gray-400 text-sm ml-1">Enter amount of ton...</label>
                        <div className="flex gap-2 mt-2">
                            <input
                                type="number"
                                className="flex-1 bg-[#1a1a1a] border border-gray-700 rounded-xl p-4 text-white focus:border-blue-500 outline-none"
                                placeholder="0.00"
                            />
                            <Button className="!rounded-xl">DEPOSIT NOW</Button>
                        </div>
                    </div>
                )}

                {activeTab === 'Withdraw' && (
                    <div className="mt-6 text-center text-gray-500">
                        Withdraw functionality coming soon.
                    </div>
                )}
            </div>

            <BottomNav/>
        </div>
    );
}