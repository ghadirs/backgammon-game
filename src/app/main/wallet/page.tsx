"use client";
import React, {useState} from "react";
import CurrencySwitch from "@/components/currencySwitch.tsx";
import {TabOption} from "@/types/wallet.ts";
import ItemCard from "@/components/itemCard.tsx";
import {Button} from "@/components";
import {useModalStore} from "@/store/useModalStore.tsx";
import Input from "@/components/Input.tsx";
import {Gem} from "lucide-react";

export default function WalletPage() {
    const [activeTab, setActiveTab] = useState<TabOption>("points");
    const [depositValue, setDepositValue] = useState<string>("");
    const [withdrawValue, setWithdrawValue] = useState<string>("");

    const openModal = useModalStore((state) => state.openModal);

    const cards = [1, 2, 3, 4];

    return (
        <main className="w-full px-6 flex items-start justify-end mt-6 gap-3">
            <div
                className="flex flex-col w-3/4 gap-2 h-[75vh] items-center justify-between rounded-xl bg-[#09152A]/35 border-b border-[#1A3150] px-4 py-2 backdrop-blur-xs">
                <CurrencySwitch activeTab={activeTab} setActiveTab={setActiveTab}/>
                {activeTab == "points" && (
                    <div className={`flex w-full items-center justify-evenly gap-2`}>
                        {cards.map((card, idx) => (
                            <ItemCard
                                key={idx}
                                onClickHandle={() => openModal("confirm-purchase")}
                            />
                        ))}
                    </div>
                )}
                {activeTab == "deposit" && (
                    <Input
                        className="mt-auto mb-auto"
                        value={depositValue}
                        onChange={(e) => setDepositValue(e.target.value)}
                        onSubmit={() => console.log(1)}
                        buttonLabel={"DEPOSIT TON"}
                        icon={
                            <div
                                className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0098EA] shadow-sm">
                                <Gem
                                    size={10}
                                    className="text-white fill-white translate-y-[0.5px]"
                                />
                            </div>
                        }
                    />
                )}
                {activeTab == "withdraw" && (
                    <Input
                        className="mt-auto mb-auto"
                        value={withdrawValue}
                        onChange={(e) => setWithdrawValue(e.target.value)}
                        onSubmit={() => console.log(1)}
                        buttonLabel={"WITHDRAW TON"}
                        icon={
                            <div
                                className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0098EA] shadow-sm">
                                <Gem
                                    size={10}
                                    className="text-white fill-white translate-y-[0.5px]"
                                />
                            </div>
                        }
                    />
                )}
            </div>
            <Button
                className={
                    " group flex h-12 w-[110px] items-center justify-center gap-3 rounded-xl border border-[#1A3150] bg-[#09152A]/60 px-2 transition-all hover:bg-[#1A3150] hover:shadow-lg active:scale-95 text-nowrap"
                }
                label={"CONNECT WALLET"}
            >
                <span className={' text-white text-xs text-[10px]'}>
                    CONNECT WALLET
                </span>
            </Button>
        </main>
    );
}
