"use client"
import React, {useState} from 'react'
import CurrencySwitch from "@/components/currencySwitch.tsx";
import {TabOption} from "@/types/wallet.ts";
import ItemCard from "@/components/itemCard.tsx";
import {Button} from "@/components";
import {Gem} from "lucide-react";

export default function WalletPage() {
    const [activeTab, setActiveTab] = useState<TabOption>('points');

    const cards = [1, 2, 3, 4]

    return (
        <main className="w-full px-6 flex items-start justify-end mt-6 gap-3">
            <div
                className="flex flex-col w-3/4 gap-2 h-[65vh] items-center justify-between rounded-xl bg-[#09152A]/35 border-b border-[#1A3150] px-4 py-2 backdrop-blur-xs">
                <CurrencySwitch activeTab={activeTab} setActiveTab={setActiveTab}/>
                <div className={`flex w-full items-center justify-evenly gap-2`}>
                    {cards.map((card, idx) =>
                        <ItemCard key={idx}/>
                    )}

                </div>
            </div>
            <Button
                className={'group flex h-12 w-[110px] items-center justify-center gap-3 rounded-xl border border-[#1A3150] bg-[#09152A]/60 px-2 transition-all hover:bg-[#1A3150] hover:shadow-lg active:scale-95 text-nowrap'}
                label={'CONNECT'}
            />
        </main>
    )
}