import React, {useEffect, useRef, useState} from 'react';
import style from './GameBoard.module.scss';
import {BoardState} from '@/types';

interface Props {
    board: BoardState;
    diceValues: number[];
    isRolling: boolean;
    p1Score?: number;
    p2Score?: number;
}

interface Point {
    x: number;
    y: number;
}

interface DragState {
    pointIndex: number;
    color: number; // 1 for light, -1 for dark
    startX: number;
    startY: number;
    currentX: number;
    currentY: number;
}

interface DiePhysics {
    x: number;
    y: number;
    vx: number;
    vy: number;
    angle: number;
    vAngle: number;
    altitude: number;
    vAltitude: number;
}

const BackgammonBoard: React.FC<Props> = ({board, diceValues, isRolling, p1Score = 88, p2Score = 51}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const boardCache = useRef<HTMLCanvasElement | null>(null);
    const requestRef = useRef<number>();
    const dragRef = useRef<DragState | null>(null);

    const [isDragging, setIsDragging] = useState(false); // Only for forcing re-renders if needed
    const [isClient, setIsClient] = useState(false);

    // --- DIMENSIONS ---
    const WIDTH = 1100;
    const HEIGHT = 700;
    const SIDEBAR_WIDTH = 80;
    const MARGIN_V = 10;
    const BAR_WIDTH = 60;
    const BAR_H = HEIGHT - (MARGIN_V * 2);
    const PLAY_AREA_WIDTH = WIDTH - (SIDEBAR_WIDTH * 2) - BAR_WIDTH;
    const QUADRANT_WIDTH = PLAY_AREA_WIDTH / 2;
    const POINT_W = QUADRANT_WIDTH / 6;
    const POINT_H = HEIGHT * 0.4;

    // --- Drage and Drop
    const getInternalCoords = (e: React.MouseEvent | React.TouchEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return {x: 0, y: 0};

        const rect = canvas.getBoundingClientRect();
        let clientX, clientY;

        // Detect if Touch or Mouse
        if ('touches' in e && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            const mouseEvt = e as React.MouseEvent;
            clientX = mouseEvt.clientX;
            clientY = mouseEvt.clientY;
        }

        // Map screen pixels to internal 1100x700 units
        const scaleX = WIDTH / rect.width;
        const scaleY = HEIGHT / rect.height;

        return {
            x: (clientX - rect.left) * scaleX,
            y: (clientY - rect.top) * scaleY
        };
    };
    const getPointAtCoords = (mx: number, my: number) => {
        // Determine if mouse is in the upper or lower half
        const isTopHalf = my < HEIGHT / 2;

        // Check horizontal zones
        const leftQuadrant = mx > SIDEBAR_WIDTH && mx < SIDEBAR_WIDTH + QUADRANT_WIDTH;
        const rightQuadrant = mx > WIDTH - SIDEBAR_WIDTH - QUADRANT_WIDTH && mx < WIDTH - SIDEBAR_WIDTH;

        if (isTopHalf) {
            if (leftQuadrant) return 12 + Math.floor((mx - SIDEBAR_WIDTH) / POINT_W);
            if (rightQuadrant) return 18 + Math.floor((mx - (WIDTH - SIDEBAR_WIDTH - QUADRANT_WIDTH)) / POINT_W);
        } else {
            // Bottom row indices are reversed (0-11)
            if (rightQuadrant) return 5 - Math.floor((mx - (WIDTH - SIDEBAR_WIDTH - QUADRANT_WIDTH)) / POINT_W);
            if (leftQuadrant) return 11 - Math.floor((mx - SIDEBAR_WIDTH) / POINT_W);
        }

        return -1;
    };
    // Refactor your existing MouseDown logic into this helper:
    const handleStartDragging = (x: number, y: number) => {
        const pointIdx = getPointAtCoords(x, y);
        if (pointIdx !== -1 && board.points[pointIdx] !== 0) {
            dragRef.current = {
                pointIndex: pointIdx,
                color: Math.sign(board.points[pointIdx]),
                startX: x, startY: y,
                currentX: x, currentY: y
            };
            setIsDragging(true);
        }
    };

    const onMouseDown = (e: React.MouseEvent) => {
        const {x, y} = getInternalCoords(e);
        handleStartDragging(x, y);
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!dragRef.current) return;
        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect) return;
        const {x, y} = getInternalCoords(e); // Use the scale-aware helper
        dragRef.current.currentX = x;
        dragRef.current.currentY = y;
    };

    const onTouchStart = (e: React.TouchEvent) => {
        const {x, y} = getInternalCoords(e);
        handleStartDragging(x, y);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        // Prevent the browser from bouncing/scrolling during the game
        if (e.cancelable) e.preventDefault();
        const {x, y} = getInternalCoords(e);
        if (dragRef.current) {
            dragRef.current.currentX = x;
            dragRef.current.currentY = y;
        }
    };

    const onMouseUp = () => {
        if (!dragRef.current) return;

        const {pointIndex: sourceIdx, color, currentX, currentY} = dragRef.current;
        const targetIdx = getPointAtCoords(currentX, currentY);

        // 1. Check if we dropped it on a valid triangle
        if (targetIdx !== -1 && targetIdx !== sourceIdx) {
            const targetCount = board.points[targetIdx];
            const targetColor = Math.sign(targetCount);

            // 2. VALIDATION RULES:
            // Rule A: Target is empty
            // Rule B: Target has your own color
            // Rule C: Target has exactly ONE opponent checker (a "blot")
            const isOpponentColor = targetColor !== 0 && targetColor !== color;
            const isOccupiedByManyOpponents = isOpponentColor && Math.abs(targetCount) > 1;

            if (!isOccupiedByManyOpponents) {
                // SUCCESS: Move is valid
                // Note: In a real app, you'd call an API or use a dispatch here.
                // For now, we update the local board state:
                board.points[sourceIdx] -= color;

                if (isOpponentColor && Math.abs(targetCount) === 1) {
                    // HIT: Opponent checker goes to the bar (logic for bar needed)
                    board.points[targetIdx] = color;
                } else {
                    board.points[targetIdx] += color;
                }
            }
        }

        // Reset dragging state
        dragRef.current = null;
        setIsDragging(false);
    };
    // --- DICE PHYSICS STATE ---
    const dicePhysics = useRef<DiePhysics[]>([
        {x: 350, y: 350, vx: 0, vy: 0, angle: 0, vAngle: 0, altitude: 0, vAltitude: 0},
        {x: 650, y: 350, vx: 0, vy: 0, angle: 0, vAngle: 0, altitude: 0, vAltitude: 0}
    ]);

    const resetDice = () => {
        const fromSide = Math.random() > 0.5 ? 1 : 0;

        dicePhysics.current.forEach((p, i) => {
            p.x = fromSide === 1 ? WIDTH + 100 : -100;

            // Aim for the vertical center (the gutter) to avoid initial checker hits
            p.y = HEIGHT / 2 + (i === 0 ? -30 : 30);

            const speed = 40 + Math.random() * 10;
            p.vx = fromSide === 1 ? -speed : speed;
            p.vy = (Math.random() - 0.5) * 5; // Low vertical spread

            p.altitude = 100;
            p.vAltitude = 8;
            p.vAngle = 0.9;
        });
    };
    useEffect(() => {
        if (isRolling) resetDice();
    }, [isRolling]);

    // --- RESTORED ORIGINAL DRAWING HELPERS ---
    const drawWoodTexture = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, baseColor: string, grainColor: string, intensity: number) => {
        ctx.save();
        ctx.fillStyle = baseColor;
        ctx.fillRect(x, y, w, h);
        ctx.globalAlpha = 0.1;
        ctx.fillStyle = grainColor;
        for (let i = 0; i < w; i += 2) {
            if (Math.random() > 0.5) {
                const grainLen = Math.random() * h;
                const startY = Math.random() * h;
                ctx.fillRect(x + i, y + startY, 1 + Math.random(), grainLen);
            }
        }
        const grad = ctx.createLinearGradient(x, y, x + w, y);
        grad.addColorStop(0, 'rgba(0,0,0,0.1)');
        grad.addColorStop(0.5, 'rgba(255,255,255,0.05)');
        grad.addColorStop(1, 'rgba(0,0,0,0.1)');
        ctx.fillStyle = grad;
        ctx.fillRect(x, y, w, h);
        ctx.restore();
    };

    const drawSideTray = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) => {
        ctx.save();
        const trayGrad = ctx.createLinearGradient(x, y, x + w, y);
        trayGrad.addColorStop(0, '#3E2315');
        trayGrad.addColorStop(0.5, '#5D3A25');
        trayGrad.addColorStop(1, '#3E2315');
        ctx.fillStyle = trayGrad;
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, 4);
        ctx.fill();
        ctx.strokeStyle = 'rgba(0,0,0,0.3)';
        ctx.lineWidth = 2;
        ctx.stroke();

        const squareSize = w * 0.85;
        const centerX = x + (w - squareSize) / 2;
        const centerY = y + h / 2;
        const gap = 36;

        const drawInlaySquare = (posY: number) => {
            ctx.save();
            ctx.fillStyle = '#E7C697';
            ctx.shadowBlur = 4;
            ctx.shadowColor = 'rgba(0,0,0,0.2)';
            ctx.fillRect(centerX, posY, squareSize, squareSize);
            ctx.strokeStyle = 'rgba(255,255,255,0.2)';
            ctx.lineWidth = 1;
            ctx.strokeRect(centerX, posY, squareSize, squareSize);
            ctx.restore();
        };

        drawInlaySquare(centerY - squareSize - gap / 2);
        drawInlaySquare(centerY + gap / 2);
        ctx.restore();
    };

    const drawCenterBar = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
        ctx.save();
        ctx.translate(x - BAR_WIDTH / 2, y - BAR_H / 2);
        ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
        ctx.shadowBlur = 4;
        ctx.shadowOffsetY = 4;
        ctx.fillStyle = '#623D2C';
        ctx.globalCompositeOperation = 'hard-light';
        ctx.fillRect(0, 0, BAR_WIDTH, BAR_H);

        ctx.save();
        ctx.clip();
        ctx.globalCompositeOperation = 'source-over';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
        ctx.shadowBlur = 19;
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, BAR_WIDTH, BAR_H);
        ctx.restore();
        ctx.restore();
    };

    const drawLCDBox = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, text: string, color: string) => {
        ctx.save();
        ctx.fillStyle = '#3e2315';
        ctx.fillRect(x, y, w, h);
        ctx.fillStyle = color;
        ctx.fillRect(x + 4, y + 4, w - 8, h - 8);
        ctx.fillStyle = '#ffdab9';
        ctx.font = 'bold 24px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'orange';
        ctx.shadowBlur = 5;
        ctx.fillText(text, x + w / 2, y + h / 2);
        ctx.restore();
    };

    // --- DICE GEOMETRY HELPERS ---
    const fillRoundedRect = (ctx: CanvasRenderingContext2D, r: number) => {
        ctx.beginPath();
        ctx.moveTo(r, 0);
        ctx.lineTo(1 - r, 0);
        ctx.quadraticCurveTo(1, 0, 1, r);
        ctx.lineTo(1, 1 - r);
        ctx.quadraticCurveTo(1, 1, 1 - r, 1);
        ctx.lineTo(r, 1);
        ctx.quadraticCurveTo(0, 1, 0, 1 - r);
        ctx.lineTo(0, r);
        ctx.quadraticCurveTo(0, 0, r, 0);
        ctx.closePath();
        ctx.fill();
    };

    const drawFace = (ctx: CanvasRenderingContext2D, val: number, origin: Point, u: Point, v: Point, bgColor: string, dotColor: string) => {
        ctx.save();
        ctx.transform(u.x, u.y, v.x, v.y, origin.x, origin.y);
        ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
        ctx.shadowBlur = 12;
        ctx.fillStyle = bgColor;
        fillRoundedRect(ctx, 0.15);
        ctx.fillStyle = dotColor;
        const r = 0.09, c = 0.5, l = 0.22, h = 0.78;
        const dotsMap: Record<number, number[][]> = {
            1: [[c, c]], 2: [[l, l], [h, h]], 3: [[l, l], [c, c], [h, h]],
            4: [[l, l], [h, l], [l, h], [h, h]], 5: [[l, l], [h, l], [c, c], [l, h], [h, h]],
            6: [[l, l], [h, l], [l, c], [h, c], [l, h], [h, h]],
        };
        dotsMap[val]?.forEach(([dx, dy]) => {
            ctx.beginPath();
            ctx.arc(dx, dy, r, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.restore();
    };

    const drawSolidCube = (ctx: CanvasRenderingContext2D, p: DiePhysics, finalVal: number) => {
        const tVal = isRolling ? Math.floor(Math.random() * 6) + 1 : finalVal;
        const isLanded = !isRolling && p.altitude < 0.1;
        const scale = 1 + (p.altitude / 300);
        const s = 44 * scale;
        const d = isLanded ? 0 : 14 * scale;
        const rad = isLanded ? Math.round(p.angle / (Math.PI / 2)) * (Math.PI / 2) : p.angle;
        const uTop = {x: Math.cos(rad) * s, y: Math.sin(rad) * s};
        const vTop = {x: Math.cos(rad + Math.PI / 2) * s, y: Math.sin(rad + Math.PI / 2) * s};
        const depthVec = {x: d * 0.6, y: d * 0.8};
        const origin = {x: p.x - (uTop.x + vTop.x) * 0.5, y: p.y - (uTop.y + vTop.y) * 0.5};

        ctx.save();

        if (isLanded) {
            ctx.shadowColor = 'rgba(0,0,0,0.2)';
            ctx.shadowBlur = 4;
            ctx.shadowOffsetX = 1;
            ctx.shadowOffsetY = 2;
        } else {
            ctx.translate(p.altitude / 8, 10 + p.altitude / 3);
            ctx.filter = `blur(${Math.min(4, p.altitude / 40)}px)`;
            ctx.fillStyle = 'rgba(0,0,0,0.25)';
            ctx.beginPath();
            const p1 = {x: origin.x + uTop.x, y: origin.y + uTop.y};
            const p3 = {x: origin.x + vTop.x, y: origin.y + vTop.y};
            ctx.moveTo(origin.x, origin.y);
            ctx.lineTo(p1.x, p1.y);
            ctx.lineTo(p1.x + depthVec.x, p1.y + depthVec.y);
            ctx.lineTo(p3.x + uTop.x + depthVec.x, p3.y + uTop.y + depthVec.y);
            ctx.lineTo(p3.x, p3.y);
            ctx.fill();
        }
        ctx.restore();

        if (!isLanded) {
            drawFace(ctx, ((tVal) % 6) + 1, {
                x: origin.x + uTop.x,
                y: origin.y + uTop.y
            }, depthVec, vTop, '#cbd5e1', '#475569');
            drawFace(ctx, ((tVal + 1) % 6) + 1, {
                x: origin.x + vTop.x,
                y: origin.y + vTop.y
            }, uTop, depthVec, '#94a3b8', '#334155');
        }
        drawFace(ctx, tVal, origin, uTop, vTop, '#ffffff', '#1e293b');
    };

    const drawPoints = (ctx: CanvasRenderingContext2D) => {
        for (let i = 0; i < 24; i++) {
            const isTop = i >= 12;
            let x = 0;
            let y = isTop ? MARGIN_V : HEIGHT - MARGIN_V;

            // Coordinate mapping
            if (i < 6) x = WIDTH - SIDEBAR_WIDTH - (i + 1) * POINT_W;
            else if (i < 12) x = SIDEBAR_WIDTH + (11 - i) * POINT_W;
            else if (i < 18) x = SIDEBAR_WIDTH + (i - 12) * POINT_W;
            else x = WIDTH - SIDEBAR_WIDTH - (23 - i + 1) * POINT_W;

            const tipY = isTop ? y + POINT_H : y - POINT_H;

            // 1. Determine colors based on index/darkness
            const isDark = i % 2 === 0;
            const fillColor = isDark ? '#872727' : '#F2AC66';
            const strokeColor = '#E99950'; // Same for both in your SVG logic

            ctx.save();

            // 2. Drop Shadow (Universal for both types)
            ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
            ctx.shadowBlur = 4;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;

            // 3. Draw Base Shape (Outer Triangle)
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + POINT_W / 2, tipY);
            ctx.lineTo(x + POINT_W, y);
            ctx.closePath();
            ctx.fillStyle = fillColor;
            ctx.fill();

            // 4. Draw Inner Highlight (Inner Stroke)
            ctx.shadowBlur = 0; // Remove shadow for the clean inner line
            const insetX = POINT_W * 0.15;
            const insetY = POINT_H * 0.05;
            const innerTipY = isTop ? tipY - insetY * 5 : tipY + insetY * 5;

            ctx.beginPath();
            ctx.moveTo(x + insetX, isTop ? y + 5 : y - 5);
            ctx.lineTo(x + POINT_W / 2, innerTipY);
            ctx.lineTo(x + POINT_W - insetX, isTop ? y + 5 : y - 5);
            ctx.closePath();

            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = 1.5;
            ctx.stroke();

            ctx.restore();
        }

    };


    useEffect(() => {
        setIsClient(true);
    }, []);

    // --- MAIN ANIMATION LOOP ---
    useEffect(() => {
        if (!isClient) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // 1. GENERATE THE STATIC BOARD ONCE
        if (!boardCache.current) {
            const cache = document.createElement('canvas');
            cache.width = WIDTH;
            cache.height = HEIGHT;
            const cCtx = cache.getContext('2d')!;

            drawWoodTexture(cCtx, 0, 0, WIDTH, HEIGHT, '#5d3a25', '#2a150b', 0.2);
            cCtx.fillStyle = 'rgba(0,0,0,0.2)';
            cCtx.fillRect(0, 0, SIDEBAR_WIDTH, HEIGHT);
            cCtx.fillRect(WIDTH - SIDEBAR_WIDTH, 0, SIDEBAR_WIDTH, HEIGHT);

            drawWoodTexture(cCtx, SIDEBAR_WIDTH, MARGIN_V, QUADRANT_WIDTH, HEIGHT - MARGIN_V * 2, '#eecfa1', '#d4b483', 0.1);
            drawWoodTexture(cCtx, SIDEBAR_WIDTH + QUADRANT_WIDTH + BAR_WIDTH, MARGIN_V, QUADRANT_WIDTH, HEIGHT - MARGIN_V * 2, '#eecfa1', '#d4b483', 0.1);

            drawWoodTexture(cCtx, SIDEBAR_WIDTH + QUADRANT_WIDTH, 0, BAR_WIDTH, HEIGHT, '#6f432a', '#3e2315', 0.2);
            drawCenterBar(cCtx, SIDEBAR_WIDTH + QUADRANT_WIDTH + (BAR_WIDTH / 2), HEIGHT / 2);
            drawSideTray(cCtx, 10, MARGIN_V, SIDEBAR_WIDTH - 20, HEIGHT - (MARGIN_V * 2));
            drawSideTray(cCtx, WIDTH - SIDEBAR_WIDTH + 10, MARGIN_V, SIDEBAR_WIDTH - 20, HEIGHT - (MARGIN_V * 2));

            drawPoints(cCtx);
            boardCache.current = cache;
        }

        const animate = () => {
            ctx.clearRect(0, 0, WIDTH, HEIGHT);
            ctx.drawImage(boardCache.current!, 0, 0);

            // --- TURN HIGHLIGHT LOGIC ---
            // Change this logic based on your actual turn variable (e.g., board.currentPlayer)
            const currentPlayer = board.;
            const isBottomTurn = currentPlayer === 1;

            // 3. DRAW DYNAMIC STUFF
            drawLCDBox(ctx, 15, HEIGHT / 2 - 60, SIDEBAR_WIDTH - 30, 30, p1Score.toString(), '#b25e34');

            // Score Circle
            ctx.beginPath();
            ctx.arc(SIDEBAR_WIDTH / 2, HEIGHT / 2, 20, 0, Math.PI * 2);
            const btnGrad = ctx.createRadialGradient(SIDEBAR_WIDTH / 2, HEIGHT / 2, 5, SIDEBAR_WIDTH / 2, HEIGHT / 2, 20);
            btnGrad.addColorStop(0, '#800000');
            btnGrad.addColorStop(1, '#400000');
            ctx.fillStyle = btnGrad;
            ctx.fill();
            ctx.strokeStyle = '#cca';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.fillStyle = '#cca';
            ctx.font = 'bold 16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('1', SIDEBAR_WIDTH / 2, HEIGHT / 2 + 5);

            drawLCDBox(ctx, 15, HEIGHT / 2 + 30, SIDEBAR_WIDTH - 30, 30, p2Score.toString(), '#b25e34');

            // Checkers
            // 2. Draw Checkers on Points
            const CHECKER_R = POINT_W * 0.43;
            board.points.forEach((count, i) => {
                if (count === 0) return;
                const isTop = i >= 12;
                let xBase = (i < 6) ? WIDTH - SIDEBAR_WIDTH - (i + 0.5) * POINT_W :
                    (i < 12) ? SIDEBAR_WIDTH + (11 - i + 0.5) * POINT_W :
                        (i < 18) ? SIDEBAR_WIDTH + (i - 12 + 0.5) * POINT_W :
                            WIDTH - SIDEBAR_WIDTH - (23 - i + 0.5) * POINT_W;

                let absCount = Math.abs(count);
                // If we are dragging from this point, hide one checker from the stack
                if (dragRef.current && dragRef.current.pointIndex === i) {
                    absCount--;
                }

                const spacing = Math.min(CHECKER_R * 2 + 2, (POINT_H - CHECKER_R) / Math.max(1, absCount - 1));

                for (let j = 0; j < absCount; j++) {
                    const y = isTop ? MARGIN_V + CHECKER_R + 5 + j * spacing : HEIGHT - MARGIN_V - CHECKER_R - 5 - j * spacing;
                    ctx.save();
                    ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
                    ctx.shadowBlur = 12;
                    ctx.beginPath();
                    ctx.arc(xBase, y, CHECKER_R, 0, Math.PI * 2);
                    ctx.fillStyle = count < 0 ? '#190802' : '#9B5A3D';
                    ctx.fill();
                    ctx.restore();
                }
            });

// 3. DRAW HELD CHECKER (Outside the loop, at the end)
            if (dragRef.current) {
                const d = dragRef.current;
                ctx.save();
                // Lifted effect
                ctx.shadowBlur = 15;
                ctx.shadowColor = 'rgba(0,0,0,0.6)';
                ctx.shadowOffsetY = 15;

                ctx.beginPath();
                // Scale slightly larger to look "closer" to the camera
                ctx.arc(d.currentX, d.currentY, CHECKER_R * 1.05, 0, Math.PI * 2);
                ctx.fillStyle = d.color < 0 ? '#190802' : '#9B5A3D';
                ctx.fill();

                // Add a highlight ring
                ctx.strokeStyle = 'rgba(255,255,255,0.3)';
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.restore();
            }


            // 4. Update & Draw 2 DICE
            dicePhysics.current.slice(0, 2).forEach((p, i) => {
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
                        const moveX = nx * overlap / 2;
                        const moveY = ny * overlap / 2;

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
                        let xBase = (i < 6) ? WIDTH - SIDEBAR_WIDTH - (i + 0.5) * POINT_W :
                            (i < 12) ? SIDEBAR_WIDTH + (11 - i + 0.5) * POINT_W :
                                (i < 18) ? SIDEBAR_WIDTH + (i - 12 + 0.5) * POINT_W :
                                    WIDTH - SIDEBAR_WIDTH - (23 - i + 0.5) * POINT_W;

                        const absCount = Math.abs(count);
                        const CHECKER_R = POINT_W * 0.43;
                        const stackHeight = Math.min(absCount * CHECKER_R * 2, POINT_H);

                        // Check distance between die and checker stack center
                        const dx = p.x - xBase;
                        const dy = isTop ? (p.y - (MARGIN_V + stackHeight / 2)) : (p.y - (HEIGHT - MARGIN_V - stackHeight / 2));
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
                    const isRightSide = p.x > (WIDTH / 2);
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
                drawSolidCube(ctx, p, diceValues[i] || 1);
            });

            requestRef.current = requestAnimationFrame(animate);
        };

        // START ANIMATION
        requestRef.current = requestAnimationFrame(animate);

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [isClient, board, diceValues, isRolling, p1Score, p2Score]);


    return (
        <div className="flex justify-center items-center p-2 sm:p-4 bg-[#1a1a1a] w-full h-full max-h-[90vh]">
            <div
                style={{borderRadius: '12px', overflow: 'hidden'}}
                className="shadow-2xl border border-[#3e2315] w-full max-w-[1100px] aspect-[11/7] relative">
                <canvas ref={canvasRef}// Mouse Events
                        onMouseDown={onMouseDown}
                        onMouseMove={onMouseMove}
                        onMouseUp={onMouseUp}
                        onMouseLeave={onMouseUp}
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onMouseUp}
                        width={WIDTH} height={HEIGHT}
                        className={`w-full h-full block touch-none ${style.gameBoard}`}/>
            </div>
        </div>
    );
};

export default BackgammonBoard;