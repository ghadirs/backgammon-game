import {useEffect, useRef} from "react";
import {
    drawBarCheckers,
    drawCenterBar,
    drawLCDBox,
    drawOffCheckers,
    drawPoints,
    drawSideTray,
    drawSolidCube,
    drawWoodTexture,
} from "@/utils/gameGeometry.ts";
import {Player, AnimatingChecker, BoardState} from "@/types";
import {DIMENSIONS} from "@/variables";

const {
    WIDTH,
    HEIGHT,
    SIDEBAR_WIDTH,
    MARGIN_V,
    BAR_WIDTH,
    QUADRANT_WIDTH,
    POINT_W,
    POINT_H,
    CHECKER_R,
    PLAY_AREA_WIDTH,
    ANIMATION_DURATION,
} = DIMENSIONS;

// --- MAIN ANIMATION LOOP ---
export const useAnimationLoop = (
    isClient: boolean,
    isRolling: boolean,
    canvasRef,
    boardCache,
    pulseRef,
    boardRef,
    requestRef,
    board: BoardState,
    currentPlayer: Player,
    animatingChecker: AnimatingChecker,
    playableMoves: number[],
    diceValues: number[],
    setAnimatingChecker: (s: any) => void,
    dicePhysics: any,
    p1Score: number,
    p2Score: number,
    onMoveExecuted?: (newPoints: number[]) => void,
) => {
    // --- LAG FIX: Keep track of latest props without triggering effect restarts ---
    const gameStateRef = useRef({
        board,
        currentPlayer,
        animatingChecker,
        playableMoves,
        diceValues,
        isRolling,
        p1Score,
        p2Score
    });

    useEffect(() => {
        gameStateRef.current = {
            board,
            currentPlayer,
            animatingChecker,
            playableMoves,
            diceValues,
            isRolling,
            p1Score,
            p2Score
        };
        if (!isRolling && !animatingChecker) {
            // temp
            console.log("player: ", currentPlayer);
            console.log("dice: ", diceValues);
            console.log("board: ", board);
        }
    }, [board, currentPlayer, animatingChecker, playableMoves, diceValues, isRolling, p1Score, p2Score]);

    useEffect(() => {
        if (!isClient) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // 1. GENERATE THE STATIC BOARD ONCE
        if (!boardCache.current) {
            const cache = document.createElement("canvas");
            cache.width = WIDTH;
            cache.height = HEIGHT;
            const cCtx = cache.getContext("2d")!;

            drawWoodTexture(cCtx, 0, 0, WIDTH, HEIGHT, "#5d3a25", "#2a150b", 0.2);
            cCtx.fillStyle = "rgba(0,0,0,0.2)";
            cCtx.fillRect(0, 0, SIDEBAR_WIDTH, HEIGHT);
            cCtx.fillRect(WIDTH - SIDEBAR_WIDTH, 0, SIDEBAR_WIDTH, HEIGHT);

            drawWoodTexture(
                cCtx,
                SIDEBAR_WIDTH,
                MARGIN_V,
                QUADRANT_WIDTH,
                HEIGHT - MARGIN_V * 2,
                "#eecfa1",
                "#d4b483",
                0.1,
            );
            drawWoodTexture(
                cCtx,
                SIDEBAR_WIDTH + QUADRANT_WIDTH + BAR_WIDTH,
                MARGIN_V,
                QUADRANT_WIDTH,
                HEIGHT - MARGIN_V * 2,
                "#eecfa1",
                "#d4b483",
                0.1,
            );

            drawWoodTexture(
                cCtx,
                SIDEBAR_WIDTH + QUADRANT_WIDTH,
                0,
                BAR_WIDTH,
                HEIGHT,
                "#6f432a",
                "#3e2315",
                0.2,
            );
            drawCenterBar(
                cCtx,
                SIDEBAR_WIDTH + QUADRANT_WIDTH + BAR_WIDTH / 2,
                HEIGHT / 2,
            );
            drawSideTray(
                cCtx,
                10,
                MARGIN_V,
                SIDEBAR_WIDTH - 20,
                HEIGHT - MARGIN_V * 2,
            );
            drawSideTray(
                cCtx,
                WIDTH - SIDEBAR_WIDTH + 10,
                MARGIN_V,
                SIDEBAR_WIDTH - 20,
                HEIGHT - MARGIN_V * 2,
            );

            drawPoints(cCtx);
            boardCache.current = cache;
        }

        const animate = (time: number) => {
            const {
                animatingChecker,
                currentPlayer,
                diceValues,
                playableMoves,
                isRolling,
                p1Score,
                p2Score
            } = gameStateRef.current;

            ctx.clearRect(0, 0, WIDTH, HEIGHT);

            // --- LAYER 1: BACKGROUND ---
            ctx.drawImage(boardCache.current!, 0, 0);

            // --- LAYER 2: TRAY & BAR (STATIONARY) ---
            // Logic: If a checker is flying TO the bar or TO the off-tray, hide one from the total count
            const animatingToWhiteOff = animatingChecker?.isBearingOff && animatingChecker.color === 1;
            const animatingToBlackOff = animatingChecker?.isBearingOff && animatingChecker.color === -1;

            // We also need to account for HITS (flying to a point but sending opponent to bar)
            // If the flying checker ISN'T bearing off, but it's landing on an opponent blot...
            // The bar count increases immediately in state, so we hide it until landing.
            const isHit = animatingChecker && !animatingChecker.isBearingOff &&
                Math.sign(boardRef.current.points[animatingChecker.toIdx]) === animatingChecker.color &&
                Math.abs(boardRef.current.points[animatingChecker.toIdx]) === 1 &&
                board.points[animatingChecker.toIdx] === -animatingChecker.color; // Board before move had opponent

            const whiteBarCount = boardRef.current.whiteBar - (isHit && animatingChecker?.color === -1 ? 1 : 0);
            const blackBarCount = boardRef.current.blackBar - (isHit && animatingChecker?.color === 1 ? 1 : 0);

            drawBarCheckers(whiteBarCount, 1, ctx);
            drawBarCheckers(blackBarCount, -1, ctx);
            drawOffCheckers(boardRef.current.whiteOff - (animatingToWhiteOff ? 1 : 0), 1, ctx);
            drawOffCheckers(boardRef.current.blackOff - (animatingToBlackOff ? 1 : 0), -1, ctx);

            // --- LAYER 3: UI & TURN HIGHLIGHT ---
            drawLCDBox(ctx, 15, HEIGHT / 2 - 60, SIDEBAR_WIDTH - 30, 30, p1Score.toString(), "#b25e34");
            drawLCDBox(ctx, 15, HEIGHT / 2 + 30, SIDEBAR_WIDTH - 30, 30, p2Score.toString(), "#b25e34");

            // Player indicator circle
            ctx.beginPath();
            ctx.arc(SIDEBAR_WIDTH / 2, HEIGHT / 2, 20, 0, Math.PI * 2);
            ctx.fillStyle = "#400000";
            ctx.fill();
            ctx.fillStyle = "#cca";
            ctx.textAlign = "center";
            ctx.fillText(currentPlayer === 1 ? "1" : "2", SIDEBAR_WIDTH / 2, HEIGHT / 2 + 5);

            // Turn Glow
            ctx.save();
            const pulse = 0.4 + Math.sin(Date.now() / 500) * 0.15;
            const isBottomTurn = currentPlayer === 1;
            const highlightGrad = ctx.createLinearGradient(0, isBottomTurn ? HEIGHT : 0, 0, isBottomTurn ? HEIGHT - (HEIGHT * 0.45) : (HEIGHT * 0.45));
            highlightGrad.addColorStop(0, `rgba(0, 150, 255, ${pulse})`);
            highlightGrad.addColorStop(1, "rgba(0, 150, 255, 0)");
            ctx.fillStyle = highlightGrad;
            ctx.fillRect(SIDEBAR_WIDTH, isBottomTurn ? HEIGHT - (HEIGHT * 0.45) : 0, PLAY_AREA_WIDTH + BAR_WIDTH, HEIGHT * 0.45);
            ctx.restore();

            // --- LAYER 4: STATIC POINT CHECKERS ---
            boardRef.current.points.forEach((count, i) => {
                if (count === 0) return;
                let absCount = Math.abs(count);

                // CRITICAL FIX: If this point is the destination, we hide the "new" checker
                if (animatingChecker && !animatingChecker.isBearingOff && animatingChecker.toIdx === i) {
                    absCount--;
                }

                if (absCount <= 0) return;

                // Position Logic
                const isTop = i >= 12;
                let xBase = i < 6 ? WIDTH - SIDEBAR_WIDTH - (i + 0.5) * POINT_W :
                    i < 12 ? SIDEBAR_WIDTH + (11 - i + 0.5) * POINT_W :
                        i < 18 ? SIDEBAR_WIDTH + (i - 12 + 0.5) * POINT_W :
                            WIDTH - SIDEBAR_WIDTH - (23 - i + 0.5) * POINT_W;

                const spacing = Math.min(CHECKER_R * 2 + 2, (POINT_H - CHECKER_R) / Math.max(1, absCount - 1));

                for (let j = 0; j < absCount; j++) {

                    // --- GHOST FIX: REMOVED THE "CONTINUE" CHECK HERE ---
                    // We do NOT need to hide the source checker here because boardRef.current
                    // was already updated (decremented) in executeAutoMove.
                    // The checkers drawn here are strictly the ones remaining on the stack.

                    const y = isTop ? MARGIN_V + CHECKER_R + 5 + j * spacing : HEIGHT - MARGIN_V - CHECKER_R - 5 - j * spacing;

                    ctx.save();
                    // Highlight Top Checker Logic
                    const isMyChecker = Math.sign(count) === currentPlayer;
                    const isTopChecker = j === absCount - 1;
                    const moveDir = currentPlayer === 1 ? 1 : -1;
                    const canMove = isTopChecker && isMyChecker && !isRolling && playableMoves.some((die) => {
                        const t = i + die * moveDir;
                        // Simple bounds and block check
                        return t >= 0 && t <= 23 && !(Math.sign(boardRef.current.points[t]) === -currentPlayer && Math.abs(boardRef.current.points[t]) >= 2);
                    });

                    if (canMove) {
                        ctx.shadowBlur = 10 + Math.sin(pulseRef.current) * 5;
                        ctx.shadowColor = currentPlayer === 1 ? "#00ffff" : "#ff00ff";
                        ctx.strokeStyle = currentPlayer === 1 ? "#00ffff" : "#ff00ff";
                        ctx.lineWidth = 3;
                        ctx.beginPath();
                        ctx.arc(xBase, y, CHECKER_R + 2, 0, Math.PI * 2);
                        ctx.stroke();
                    }

                    ctx.shadowColor = "rgba(0, 0, 0, 0.45)";
                    ctx.shadowBlur = 12;
                    ctx.beginPath();
                    ctx.arc(xBase, y, CHECKER_R, 0, Math.PI * 2);
                    ctx.fillStyle = count < 0 ? "#190802" : "#9B5A3D";
                    ctx.fill();
                    ctx.restore();
                }
            });


// --- LAYER 5: THE FLYING CHECKER ---
            if (animatingChecker) {
                const elapsed = time - animatingChecker.startTime;
                const progress = Math.min(elapsed / ANIMATION_DURATION, 1);
                const ease = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;

                const currentX = animatingChecker.fromX + (animatingChecker.toX - animatingChecker.fromX) * ease;
                const currentY = animatingChecker.fromY + (animatingChecker.toY - animatingChecker.fromY) * ease;
                const jumpY = currentY - Math.sin(progress * Math.PI) * 50; // Hop

                ctx.save();
                ctx.shadowBlur = 15;
                ctx.shadowColor = "rgba(0,0,0,0.5)";
                ctx.beginPath();
                ctx.arc(currentX, jumpY, CHECKER_R * 1.1, 0, Math.PI * 2);
                ctx.fillStyle = animatingChecker.color < 0 ? "#190802" : "#9B5A3D";
                ctx.fill();
                ctx.restore();

                if (progress >= 1) {
                    boardRef.current = animatingChecker.newBoardState;
                    const finalPoints = animatingChecker.newPoints;
                    setAnimatingChecker(null);
                    if (onMoveExecuted) onMoveExecuted(finalPoints);
                }
            }
            
            // 4. Update & Draw 2 DICE
            dicePhysics.current.slice(0, 2).forEach((p, i) => {
                const dieValue = diceValues[i];
                const isLanded = !isRolling && p.altitude < 0.1;

                // A die is "playable" if its value exists in the moves queue
                const isPlayable = isLanded && playableMoves.includes(dieValue);

                ctx.save();

                // --- Dimming Logic ---
                // If the die has been used (not in playableMoves) and it's not currently rolling
                if (!isRolling && isLanded && !isPlayable) {
                    ctx.globalAlpha = 0.4; // Lower opacity for used dice
                }

                if (isRolling || p.altitude > 0 || Math.abs(p.vx) > 0.1) {
                    p.vAltitude -= 0.6;
                    p.altitude += p.vAltitude;
                    if (p.altitude < 0) {
                        p.altitude = 0;
                        p.vAltitude *= -0.4;
                        p.vx *= 0.7;
                        p.vy *= 0.7;
                    }
                    p.x += p.vx;
                    p.y += p.vy;

                    const dice = dicePhysics.current.slice(0, 2);

                    // --- NEW: Dice-to-Dice Collision ---
                    const d1 = dice[0];
                    const d2 = dice[1];
                    const dx = d2.x - d1.x;
                    const dy = d2.y - d1.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const minDistance = 50; // Dice size (44) + small buffer

                    if (distance < minDistance && distance > 0) {
                        const overlap = minDistance - distance;
                        const nx = dx / distance; // Normal X
                        const ny = dy / distance; // Normal Y

                        // Push them apart equally
                        const moveX = (nx * overlap) / 2;
                        const moveY = (ny * overlap) / 2;

                        d1.x -= moveX;
                        d1.y -= moveY;
                        d2.x += moveX;
                        d2.y += moveY;

                        // Bounce velocities if they are still moving
                        d1.vx *= -0.5;
                        d1.vy *= -0.5;
                        d2.vx *= -0.5;
                        d2.vy *= -0.5;
                    }

                    // Inside dicePhysics.current.forEach...
                    p.x += p.vx;
                    p.y += p.vy;

                    // --- NEW: Checker Collision Avoidance ---
                    board.points.forEach((count, i) => {
                        if (count === 0) return;

                        // Calculate the center of this point stack
                        const isTop = i >= 12;
                        let xBase =
                            i < 6
                                ? WIDTH - SIDEBAR_WIDTH - (i + 0.5) * POINT_W
                                : i < 12
                                    ? SIDEBAR_WIDTH + (11 - i + 0.5) * POINT_W
                                    : i < 18
                                        ? SIDEBAR_WIDTH + (i - 12 + 0.5) * POINT_W
                                        : WIDTH - SIDEBAR_WIDTH - (23 - i + 0.5) * POINT_W;

                        const absCount = Math.abs(count);
                        const CHECKER_R = POINT_W * 0.43;
                        const stackHeight = Math.min(absCount * CHECKER_R * 2, POINT_H);

                        // Check distance between die and checker stack center
                        const dx = p.x - xBase;
                        const dy = isTop
                            ? p.y - (MARGIN_V + stackHeight / 2)
                            : p.y - (HEIGHT - MARGIN_V - stackHeight / 2);
                        const dist = Math.sqrt(dx * dx + dy * dy);

                        // If die is too close to a stack, push it away horizontally
                        const minSafeDist = CHECKER_R + 25;
                        if (dist < minSafeDist && p.altitude < 10) {
                            const overlap = minSafeDist - dist;
                            const nx = dx / dist;

                            // Push die toward the gaps between points
                            p.x += nx * overlap;
                            p.vx *= -0.5; // Add a little bounce effect
                        }
                    });

                    // Boundaries (Force same quadrant)
                    const isRightSide = p.x > WIDTH / 2;
                    let minX, maxX;
                    if (!isRightSide) {
                        minX = SIDEBAR_WIDTH + 25;
                        maxX = SIDEBAR_WIDTH + QUADRANT_WIDTH - 25;
                    } else {
                        minX = SIDEBAR_WIDTH + QUADRANT_WIDTH + BAR_WIDTH + 25;
                        maxX = WIDTH - SIDEBAR_WIDTH - 25;
                    }

                    if (p.x < minX) {
                        p.vx *= -0.8;
                        p.x = minX;
                    }
                    if (p.x > maxX) {
                        p.vx *= -0.8;
                        p.x = maxX;
                    }

                    const minY = POINT_H + 40;
                    const maxY = HEIGHT - POINT_H - 40;
                    if (p.y < minY) {
                        p.vy *= -0.8;
                        p.y = minY;
                    }
                    if (p.y > maxY) {
                        p.vy *= -0.8;
                        p.y = maxY;
                    }
                    p.angle += p.vAngle;
                }
                drawSolidCube(ctx, p, diceValues[i] || 1, isRolling);

                ctx.restore(); // Important: resets alpha so it doesn't affect the rest of the board
            });

            requestRef.current = requestAnimationFrame(animate);
        };

        // START ANIMATION
        requestRef.current = requestAnimationFrame(animate);


        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [
        isClient,
    ]);
};
