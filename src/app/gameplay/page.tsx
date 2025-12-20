"use client";

import React, {useEffect, useState} from 'react';
import {CheckCircle2, LogOut, Undo2, Volume2} from 'lucide-react';
import BackgammonBoard from '@/components/BackgammonBoard';
import DiceCanvas from "@/components/DiceCanvas";
import {BoardState, Player} from '@/types';
import styles from './Gameplay.module.scss';
import {Toggle} from "@/components/Toggle.tsx";
import {Button} from "@/components/Button.tsx";
import {PlayerAvatar} from "@/components/PlayerAvatar.tsx";
import ThreeDiceCanvas from "@/components/DiceCanvas";

const INITIAL_BOARD: BoardState = {
    points: [-2, 0, 0, 0, 0, 5, 0, 3, 0, 0, 0, -5, 5, 0, 0, 0, 0, -3, 0, 5, 0, 0, 0, 2],
    whiteBar: 0, blackBar: 0, whiteOff: 0, blackOff: 0,
};

export default function GameplayPage() {
    const [board, setBoard] = useState<BoardState>(INITIAL_BOARD);
    const [dice, setDice] = useState<number[]>([1, 1]);
    const [autoRoll, setAutoRoll] = useState<boolean>(true);
    const [isRolling, setIsRolling] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState<Player>(Player.White);
    const [hasMounted, setHasMounted] = useState(false);

    // Fix for Hydration Mismatch
    useEffect(() => {
        setHasMounted(true);
    }, []);

    const rollDice = () => {
        if (isRolling) return;
        setIsRolling(true);
        let rolls = 0;
        const interval = setInterval(() => {
            setDice([Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1]);
            rolls++;
            if (rolls > 15) {
                clearInterval(interval);
                setIsRolling(false);
                setCurrentPlayer(prev => prev === Player.White ? Player.Black : Player.White);
            }
        }, 60);
    };

    if (!hasMounted) return <div className="min-h-screen bg-[#111]"/>;

    return (
        <main className={styles.mainWrapper}>
            <div className={styles.gameGrid}>

                {/* LEFT SIDEBAR */}
                <aside className={`${styles.sidebar} ${styles.left}`}>
                    <PlayerAvatar
                        name="Taylor Swift"
                        balance="4.2B"
                        flag="🇮🇹"
                        image="/avatars/taylor-swift.jpg"
                        color="6E78B3"
                    />

                    <Toggle enabled={autoRoll} setEnabled={setAutoRoll}/>

                    <footer className={styles.footerActions}>
                        <Button label="Sound on" icon={<Volume2 size={18}/>}/>
                        <Button label="Exit game" icon={<LogOut size={18}/>}/>
                    </footer>
                </aside>

                {/* CENTER BOARD */}
                <section className={styles.boardContainer}>
                    <div className={styles.boardOuterFrame}>
                        <BackgammonBoard
                            board={board}
                            p1Score={88}
                            p2Score={51}
                        />
                        <div className={styles.diceOverlay} onClick={() => rollDice()}>
                            <ThreeDiceCanvas dice={dice} isRolling={isRolling}/>
                        </div>
                    </div>
                </section>

                {/* RIGHT SIDEBAR */}
                <aside className={`${styles.sidebar} ${styles.right}`}>
                    <PlayerAvatar
                        name="Taylor Swift"
                        balance="4.2B"
                        flag="🇮🇹"
                        image="/avatars/taylor-swift.jpg"
                        color="6E78B3"
                    />

                    <div className={styles.actionColumn}>
                        <Button label="Undo" icon={<Undo2 size={18}/>}/>
                        <Button label="Done" icon={<CheckCircle2 size={18}/>} onClick={() => rollDice()}/>
                    </div>

                    <footer className={styles.footerActions}>
                    </footer>
                </aside>

            </div>
        </main>
    );
}