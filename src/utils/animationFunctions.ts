import {DIMENSIONS} from "@/variables";
import {getBearOffPos} from "@/utils/helpers.ts";

const {WIDTH, HEIGHT, SIDEBAR_WIDTH, POINT_W, POINT_H, CHECKER_R, MARGIN_V} = DIMENSIONS;

export const executeAutoMove = (
    fromIdx: number,
    animatingChecker,
    playableMoves,
    currentPlayer,
    board,
    boardRef,
    setPlayableMoves,
    setAnimatingChecker,
    getCheckerPixels,
) => {
    if (animatingChecker || playableMoves.length === 0) return;

    const moveDir = currentPlayer === 1 ? 1 : -1;
    let chosenMoveIndex = -1;
    let targetIdx = -1;
    let isBearingOff = false;

    // 1. Find the first valid move from our queue of playable moves
    for (let i = 0; i < playableMoves.length; i++) {
        const moveDistance = playableMoves[i];
        const potentialIdx = fromIdx + moveDistance * moveDir;

        // --- RULE: BEARING OFF (Sidebar) ---
        // White (1) moves 0 -> 23. Index > 23 is off.
        // Black (-1) moves 23 -> 0. Index < 0 is off.
        if ((currentPlayer === 1 && potentialIdx > 23) || (currentPlayer === -1 && potentialIdx < 0)) {
            // Note: In real rules, all checkers must be in home board to bear off
            chosenMoveIndex = i;
            isBearingOff = true;
            break;
        }

        // Check bounds
        if (potentialIdx >= 0 && potentialIdx <= 23) {
            const targetCount = board.points[potentialIdx];

            // Rule: Destination must be empty, yours, or a blot (1 opponent)
            const isBlocked =
                Math.sign(targetCount) !== 0 &&
                Math.sign(targetCount) !== currentPlayer &&
                Math.abs(targetCount) > 1;

            if (!isBlocked) {
                chosenMoveIndex = i;
                targetIdx = potentialIdx;
                break; // We found a valid move, stop looking
            }
        }
    }

    // 2. If a valid move was found, execute it
    if (chosenMoveIndex !== -1) {
        const moveDistance = playableMoves[chosenMoveIndex];
        // Calculate targetIdx for non-bearing moves
        if (!isBearingOff) {
            targetIdx = fromIdx + moveDistance * moveDir;
        }

        const startStackIdx = Math.abs(board.points[fromIdx]) - 1;
        const startPos = getCheckerPixels(fromIdx, startStackIdx);

        let endPos;
        const newPoints = [...board.points];
        const newBoard = {...board, points: newPoints};

        // --- SUBTRACT ONLY ONCE ---
        newPoints[fromIdx] -= currentPlayer;

        if (isBearingOff) {
            // --- FIX: Use Shared Geometry Helper ---
            const currentOffCount = currentPlayer === 1 ? board.whiteOff : board.blackOff;

            // We pass 'currentOffCount' as the index, which puts it at the TOP of the stack
            const pos = getBearOffPos(currentPlayer, currentOffCount);

            endPos = {x: pos.x, y: pos.y};

            if (currentPlayer === 1) newBoard.whiteOff++;
            else newBoard.blackOff++;

        } else {
            const targetCount = board.points[targetIdx];
            const isOpponentBlot = targetCount !== 0 && Math.sign(targetCount) !== currentPlayer;

            if (isOpponentBlot) {
                // HITTING
                endPos = getCheckerPixels(targetIdx, 0);
                newPoints[targetIdx] = currentPlayer; // Replace opponent blot with yours

                // Move opponent to bar
                if (currentPlayer === 1) newBoard.blackBar++; else newBoard.whiteBar++;
            } else {
                // NORMAL MOVE
                const destStackIdx = Math.abs(targetCount);
                endPos = getCheckerPixels(targetIdx, destStackIdx);
                newPoints[targetIdx] += currentPlayer;
            }
        }

        // CRITICAL: Sync the Ref immediately so the Bar/Tray draws the update
// while the animation is playing
        boardRef.current = newBoard;

        // --- CRITICAL: Remove the used move from the state ---
        const newPlayableMoves = [...playableMoves];
        newPlayableMoves.splice(chosenMoveIndex, 1); // Remove the specific die used
        setPlayableMoves(newPlayableMoves);

        // --- Trigger Animation ---
        setAnimatingChecker({
            fromX: startPos.x,
            fromY: startPos.y,
            toX: endPos.x,
            toY: endPos.y,
            fromIdx: fromIdx,
            color: currentPlayer,
            startTime: performance.now(),
            newPoints: newPoints,
            newBoardState: newBoard
        });
    }
};

export const resetDice = (dicePhysics: any) => {
    const fromSide = Math.random() > 0.5 ? 1 : 0;

    dicePhysics.current.forEach((p, i) => {
        p.x = fromSide === 1 ? WIDTH + 80 : -80;

        // Aim for the vertical center (the gutter) to avoid initial checker hits
        p.y = HEIGHT / 2 + (i === 0 ? -25 : 25);

        const speed = 14 + Math.random() * 3;
        p.vx = fromSide === 1 ? -speed : speed;
        p.vy = (Math.random() - 0.5) * 2; // Low vertical spread

        p.altitude = 40;
        p.vAltitude = 6 + Math.random() * 4;
        p.vAngle = 0.2 + Math.random() * 0.3;
    });
};
