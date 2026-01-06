"use client";

import React, {useEffect, useState} from "react";
import {CheckCircle2, LogOut, Undo2, Volume2} from "lucide-react";
import {Button, BackgammonBoard, PlayerAvatar, Toggle} from "@/components";
import {BoardState, Player} from "@/types";
import Link from "next/link";

const INITIAL_BOARD: BoardState = {
    points: [
        -2, 0, 0, 0, 0, 5, 0, 3, 0, 0, 0, -5, 5, 0, 0, 0, 0, -3, 0, 5, 0, 0, 0, 2,
    ],
    whiteBar: 0,
    blackBar: 0,
    whiteOff: 0,
    blackOff: 0,
};

export default function GameplayPage() {
    const [board, setBoard] = useState<BoardState>(INITIAL_BOARD);
    const [dice, setDice] = useState<number[]>([1, 1]);
    const [autoRoll, setAutoRoll] = useState<boolean>(true);
    const [isRolling, setIsRolling] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState<number>(1);
    const [hasMounted, setHasMounted] = useState(false);

    const handleMoveExecuted = (newPoints: number[]) => {
        setBoard((prev) => ({
            ...prev,
            points: newPoints,
        }));
        // Optionally decrement the used dice here
    };

    // Fix for Hydration Mismatch
    useEffect(() => {
        setHasMounted(true);
    }, []);

    const rollDice = () => {
        if (isRolling) return;
        setIsRolling(true);
        let rolls = 0;
        const interval = setInterval(() => {
            setDice([
                Math.floor(Math.random() * 6) + 1,
                Math.floor(Math.random() * 6) + 1,
            ]);
            rolls++;
            if (rolls > 15) {
                clearInterval(interval);
                setIsRolling(false);
                setCurrentPlayer((prev) =>
                    prev === Player.White ? Player.Black : Player.White,
                );
            }
        }, 60);
    };

    if (!hasMounted) return <div className="min-h-screen bg-[#111]"/>;

    return (
        <main
            className="relative h-screen w-screen overflow-hidden flex items-center justify-center bg-[url('/background.png')] bg-cover bg-center text-white">
            <div className="absolute inset-0 bg-[rgba(10,14,20,0.4)] z-0"></div>

            <div className="relative z-10 grid grid-cols-[120px_1fr_120px] gap-5 w-full h-full">
                {/* LEFT SIDEBAR */}
                <aside
                    className="flex flex-col justify-between items-start h-full pt-4 pl-[14px] box-border">
                    <div className="flex flex-col w-full h-full">
                        <PlayerAvatar
                            name="Taylor Swift"
                            balance="4.2B"
                            flag="🇮🇹"
                            image="/avatars/taylor-swift.jpg"
                            color="6E78B3"
                        />

                        <div className=" flex flex-col items-center gap-[43px] mt-auto mb-auto">
                            <Toggle enabled={autoRoll} setEnabled={setAutoRoll}/>
                        </div>
                    </div>

                    <footer className="flex flex-col justify-center items-center gap-2.5 w-full mb-4">
                        <Button
                            className='group flex h-9 min-w-[100px] w-max items-center justify-start py-1 px-4 gap-1 rounded-md border border-[#1A3150] bg-[#09152A]/60  transition-all hover:bg-[#1A3150] hover:shadow-lg active:scale-95 cursor-pointer'
                            label="Sound on">
                            <Volume2 size={18}/>
                            <span className="text-[8px] mr-auto ml-auto font-medium uppercase tracking-wide text-white">
      SOUND ON
    </span>
                        </Button>
                        <Link href="/lobby">
                            <Button
                                className='group flex h-9 min-w-[100px] w-max items-center justify-start py-1 px-4 gap-1 rounded-md border border-[#1A3150] bg-[#09152A]/60  transition-all hover:bg-[#1A3150] hover:shadow-lg active:scale-95 cursor-pointer'
                                label="Quit Game">
                                <LogOut size={18}/>
                                <span
                                    className="text-[8px] mr-auto ml-auto font-medium uppercase tracking-wide text-white">
     QUIT GAME
    </span>
                            </Button>
                        </Link>
                    </footer>
                </aside>

                {/* CENTER BOARD */}
                <section className="flex justify-center h-full">
                    <div className="relative bg-[rgba(212,175,55,0.05)] rounded-xl overflow-x-hidden mt-auto mb-auto">
                        <BackgammonBoard
                            isRolling={isRolling}
                            diceValues={dice}
                            board={board}
                            p1Score={88}
                            p2Score={51}
                            currentPlayer={currentPlayer}
                            setCurrentPlayer={setCurrentPlayer}
                            onMoveExecuted={handleMoveExecuted}
                        />
                    </div>
                </section>

                {/* RIGHT SIDEBAR */}
                <aside className="flex flex-col justify-between items-center h-full pt-4 pr-[14px] box-border">
                    <PlayerAvatar
                        name="Taylor Swift"
                        balance="4.2B"
                        flag="🇮🇹"
                        image="/avatars/taylor-swift.jpg"
                        color="6E78B3"
                    />

                    <div className=" flex flex-col justify-center gap-[18px] w-[95%] max-w-[160px] items-center">
                        <Button
                            className='group flex h-9 min-w-[100px] w-max items-center justify-start py-1 px-4 gap-1 rounded-md border border-[#1A3150] bg-[#09152A]/60  transition-all hover:bg-[#1A3150] hover:shadow-lg active:scale-95 cursor-pointer'
                            label="UNDO">
                            <Undo2 size={18}/>
                            <span className="text-[8px] mr-auto ml-auto font-medium uppercase tracking-wide text-white">
      UNDO
                            </span></Button>
                        <Button
                            label={'DONE'}
                            className='group flex h-9 min-w-[100px] w-max items-center justify-start py-1 px-4 gap-1 rounded-md border border-[#1A3150] bg-[#09152A]/60  transition-all hover:bg-[#1A3150] hover:shadow-lg active:scale-95 cursor-pointer'
                            onClick={() => rollDice()}
                        >
                            <CheckCircle2 size={18}/>
                            <span className="text-[8px] mr-auto ml-auto font-medium uppercase tracking-wide text-white">
      UNDO
                            </span></Button>


                    </div>

                    <footer className="flex flex-col gap-2.5 h-[82px] w-full"></footer>
                </aside>
            </div>
        </main>
    );
}
