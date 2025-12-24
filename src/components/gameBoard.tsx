import React, {useEffect, useRef, useState} from "react";
import {BoardState, DiePhysics} from "@/types";
import {
    getCheckerPixels,
    getInternalCoords,
    getPointAtCoords,
} from "@/utils/helpers.ts";
import styles from "./gameBoard.module.scss";
import {executeAutoMove, resetDice} from "@/utils/animationFunctions.ts";
import {useAnimationLoop} from "@/hooks/animationLoopHook.tsx";
import {DIMENSIONS} from "@/variables";

interface Props {
    board: BoardState;
    diceValues: number[];
    isRolling: boolean;
    p1Score?: number;
    p2Score?: number;
    currentPlayer: number;
    setCurrentPlayer: (currentPlayer: number) => void;
    onMoveExecuted?: (newPoints: number[]) => void;
}

const BackgammonBoard: React.FC<Props> = ({
                                              board,
                                              diceValues,
                                              isRolling,
                                              p1Score = 88,
                                              p2Score = 51,
                                              currentPlayer,
                                              onMoveExecuted,
                                          }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const boardCache = useRef<HTMLCanvasElement | null>(null);
    const requestRef = useRef<number>(null);

    const {
        WIDTH, HEIGHT, SIDEBAR_WIDTH, QUADRANT_WIDTH, POINT_W,
    } = DIMENSIONS;

    // Inside your component
    const [playableMoves, setPlayableMoves] = useState<number[]>([]);

    // Pulse animation for state "Available moves"
    const pulseRef = useRef(0);
    const [isClient, setIsClient] = useState(false);

    // Track the checker currently in flight
    const [animatingChecker, setAnimatingChecker] = useState<null>(null);

    // --- CLICK HANDLER ---
    const handleCanvasClick = (e: React.MouseEvent) => {
        if (isRolling || animatingChecker) return;

        const {x, y} = getInternalCoords(
            e,
            canvasRef.current,
        );
        const pointIdx = getPointAtCoords(
            x,
            y,
        );

        // Check if the clicked point has the current player's checkers
        if (
            pointIdx !== -1 &&
            Math.sign(board.points[pointIdx]) === currentPlayer
        ) {
            executeAutoMove(
                pointIdx,
                animatingChecker,
                playableMoves,
                currentPlayer,
                board,
                setPlayableMoves,
                setAnimatingChecker,
                getCheckerPixels,
            );
        }
    };

    // --- DICE PHYSICS STATE ---
    const dicePhysics = useRef<DiePhysics[]>([
        {
            x: 350,
            y: 350,
            vx: 0,
            vy: 0,
            angle: 0,
            vAngle: 0,
            altitude: 0,
            vAltitude: 0,
        },
        {
            x: 650,
            y: 350,
            vx: 0,
            vy: 0,
            angle: 0,
            vAngle: 0,
            altitude: 0,
            vAltitude: 0,
        },
    ]);

    useEffect(() => {
        if (isRolling) resetDice(dicePhysics,);
    }, [isRolling]);

    useEffect(() => {
        setIsClient(true);
    }, []);

    //Add a ref to track the current board state
    const boardRef = useRef(board);
    useEffect(() => {
        boardRef.current = board;
    }, [board]);

    useAnimationLoop(
        isClient,
        isRolling,
        canvasRef,
        boardCache,
        pulseRef,
        boardRef,
        requestRef,
        board,
        currentPlayer,
        animatingChecker,
        playableMoves,
        diceValues,
        setAnimatingChecker,
        dicePhysics,
        p1Score,
        p2Score,
        onMoveExecuted,
    );

    // EFFECT: When dice are rolled, generate the moves list
    useEffect(() => {
        if (isRolling) {
            setPlayableMoves([]); // Clear moves while rolling
            return;
        }

        // Wait until dice have values (not 0)
        if (diceValues.length === 2 && diceValues[0] !== 0) {
            if (diceValues[0] === diceValues[1]) {
                // DOUBLES: Player gets 4 moves
                setPlayableMoves([
                    diceValues[0],
                    diceValues[0],
                    diceValues[0],
                    diceValues[0],
                ]);
            } else {
                // STANDARD: Player gets 2 moves
                setPlayableMoves([...diceValues]);
            }
        }
    }, [diceValues, isRolling]);

    return (
        <div className="flex justify-center items-center p-2 sm:p-4 bg-[#1a1a1a] w-full h-full max-h-[90vh]">
            <div
                style={{borderRadius: "12px", overflow: "hidden"}}
                className="shadow-2xl border border-[#3e2315] w-full max-w-[1100px] aspect-[11/7] relative"
            >
                <canvas
                    ref={canvasRef} // Mouse Events
                    onClick={handleCanvasClick}
                    width={WIDTH}
                    height={HEIGHT}
                    className={`w-full h-full block touch-none ${styles.gameBoard}`}
                />
            </div>
        </div>
    );
};

export default BackgammonBoard;
