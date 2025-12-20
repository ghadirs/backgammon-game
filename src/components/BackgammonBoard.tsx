    import React, {useEffect, useRef, useState} from 'react';
    import {BoardState} from '@/types';

    interface Props {
        board: BoardState;
        // Optional scores for the left panel
        p1Score?: number;
        p2Score?: number;
    }

    const BackgammonBoard: React.FC<Props> = ({board, p1Score = 88, p2Score = 51}) => {
        const canvasRef = useRef<HTMLCanvasElement>(null);
        const [hasMounted, setHasMounted] = useState(false);

        // General Dimensions
        const WIDTH = 1100; // Slightly wider to accommodate side panels
        const HEIGHT = 700;

        // Section Dimensions
        const SIDEBAR_WIDTH = 80; // Left and Right panels
        const MARGIN_V = 10;      // Vertical margin
        const BAR_WIDTH = 60;     // Center hinge/bar
        const BAR_H = HEIGHT - (MARGIN_V * 2);

        // Play Area Calculations
        const PLAY_AREA_WIDTH = WIDTH - (SIDEBAR_WIDTH * 2) - BAR_WIDTH;
        const QUADRANT_WIDTH = PLAY_AREA_WIDTH / 2;
        const POINT_W = QUADRANT_WIDTH / 6;
        const POINT_H = HEIGHT * 0.4;


        useEffect(() => {
            setHasMounted(true);
        }, []);


        useEffect(() => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // --- Drawing Helper Functions ---

            /**
             * Draws the side trays (bear-off areas) with wood textures and cream inlays.
             * @param {CanvasRenderingContext2D} ctx - The canvas context
             * @param {number} x - Horizontal start position
             * @param {number} y - Vertical start position
             * @param {number} w - Width of the tray
             * @param {number} h - Total height of the tray
             */
            const drawSideTray = (ctx, x, y, w, h) => {
                ctx.save();

                // 1. Draw the recessed tray background (Dark Wood)
                // We use a linear gradient to simulate the "depth" of the tray
                const trayGrad = ctx.createLinearGradient(x, y, x + w, y);
                trayGrad.addColorStop(0, '#3E2315'); // Left shadow
                trayGrad.addColorStop(0.5, '#5D3A25'); // Center base wood
                trayGrad.addColorStop(1, '#3E2315'); // Right shadow

                ctx.fillStyle = trayGrad;
                ctx.beginPath();
                // Drawing the tray slightly rounded to match the board edges
                ctx.roundRect(x, y, w, h, 4);
                ctx.fill();

                // 2. Add a subtle inner shadow for depth
                ctx.strokeStyle = 'rgba(0,0,0,0.3)';
                ctx.lineWidth = 2;
                ctx.stroke();

                // 3. Draw the Cream-Colored Inlay Squares
                // In your design, these are positioned in the center-right area
                const squareSize = w * 0.85; // Slightly smaller than tray width
                const centerX = x + (w - squareSize) / 2;
                const centerY = y + h / 2;
                const gap = 36; // Space between the two squares

                const drawInlaySquare = (posY) => {
                    ctx.save();
                    // Cream base color
                    ctx.fillStyle = '#E7C697';

                    // Add wood grain effect to the inlay to match image_49048a.jpg
                    ctx.shadowBlur = 4;
                    ctx.shadowColor = 'rgba(0,0,0,0.2)';

                    ctx.fillRect(centerX, posY, squareSize, squareSize);

                    // Subtle highlight on the inlay
                    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
                    ctx.lineWidth = 1;
                    ctx.strokeRect(centerX, posY, squareSize, squareSize);
                    ctx.restore();
                };

                // Draw the top and bottom cream inlays
                drawInlaySquare(centerY - squareSize - gap / 2);
                drawInlaySquare(centerY + gap / 2);

                ctx.restore();
            };


            // 1. Procedural Wood Texture Generator (No external images needed)
            const drawWoodTexture = (x: number, y: number, w: number, h: number, baseColor: string, grainColor: string, intensity: number) => {
                ctx.save();
                ctx.fillStyle = baseColor;
                ctx.fillRect(x, y, w, h);

                // Create wood grain using random lines
                ctx.globalAlpha = 0.1;
                ctx.fillStyle = grainColor;
                for (let i = 0; i < w; i += 2) {
                    if (Math.random() > 0.5) {
                        const grainLen = Math.random() * h;
                        const startY = Math.random() * h;
                        ctx.fillRect(x + i, y + startY, 1 + Math.random(), grainLen);
                    }
                }
                // General gradient for lighting/sheen
                const grad = ctx.createLinearGradient(x, y, x + w, y);
                grad.addColorStop(0, 'rgba(0,0,0,0.1)');
                grad.addColorStop(0.5, 'rgba(255,255,255,0.05)');
                grad.addColorStop(1, 'rgba(0,0,0,0.1)');
                ctx.fillStyle = grad;
                ctx.fillRect(x, y, w, h);

                ctx.restore();
            };


            const drawMainBoard = () => {
                // Main background (Dark Wood Frame)
                drawWoodTexture(0, 0, WIDTH, HEIGHT, '#5d3a25', '#2a150b', 0.2);

                // Left Panel Background (Digital Score area)
                ctx.fillStyle = 'rgba(0,0,0,0.2)';
                ctx.fillRect(0, 0, SIDEBAR_WIDTH, HEIGHT);

                // Right Panel Background (Tray area)
                ctx.fillRect(WIDTH - SIDEBAR_WIDTH, 0, SIDEBAR_WIDTH, HEIGHT);

                // Playing Surface (Light Wood) - Left Side
                drawWoodTexture(
                    SIDEBAR_WIDTH,
                    MARGIN_V,
                    QUADRANT_WIDTH,
                    HEIGHT - MARGIN_V * 2,
                    '#eecfa1', // Light Oak
                    '#d4b483',
                    0.1
                );

                // Playing Surface (Light Wood) - Right Side
                drawWoodTexture(
                    SIDEBAR_WIDTH + QUADRANT_WIDTH + BAR_WIDTH,
                    MARGIN_V,
                    QUADRANT_WIDTH,
                    HEIGHT - MARGIN_V * 2,
                    '#eecfa1',
                    '#d4b483',
                    0.1
                );

                // Calculate the center point of the board
                const centerX = SIDEBAR_WIDTH + QUADRANT_WIDTH + (BAR_WIDTH / 2);
                const centerY = HEIGHT / 2;
                // Call the new refactored bar
                drawCenterBar(ctx, centerX, centerY);
            }

            const drawCenterBar = (ctx, x, y) => {

                ctx.save();

                // 1. Move to the center of the board
                ctx.translate(x - BAR_WIDTH / 2, y - BAR_H / 2);

                // 2. Drop Shadow (effect1_dropShadow_1_339)
                ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
                ctx.shadowBlur = 4;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 4;

                // 3. Main Rect (fill="#623D2C")
                ctx.fillStyle = '#623D2C';
                ctx.globalCompositeOperation = 'hard-light'; // mix-blend-mode: hard-light
                ctx.fillRect(0, 0, BAR_WIDTH, BAR_H);

                // 4. Inner Shadow (effect2_innerShadow_1_339)
                // stdDeviation="9.5" creates a very soft, deep internal glow
                ctx.save();
                ctx.clip(); // Ensure shadow stays inside
                ctx.globalCompositeOperation = 'source-over';
                ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
                ctx.shadowBlur = 19; // stdDeviation * 2
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;

                // We draw a stroke around the edge to cast the shadow inward
                ctx.strokeStyle = '#000';
                ctx.lineWidth = 2;
                ctx.strokeRect(0, 0, BAR_WIDTH, BAR_H);
                ctx.restore();

                ctx.restore();
            };


            const drawPoints = () => {
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

            const drawCheckers = () => {
                const CHECKER_R = POINT_W * 0.43; // Checker radius

                for (let i = 0; i < 24; i++) {
                    const count = board.points[i];
                    if (count === 0) continue;

                    const isTop = i >= 12;
                    let xBase = 0;

                    if (i < 6) xBase = WIDTH - SIDEBAR_WIDTH - (i + 0.5) * POINT_W;
                    else if (i < 12) xBase = SIDEBAR_WIDTH + (11 - i + 0.5) * POINT_W;
                    else if (i < 18) xBase = SIDEBAR_WIDTH + (i - 12 + 0.5) * POINT_W;
                    else xBase = WIDTH - SIDEBAR_WIDTH - (23 - i + 0.5) * POINT_W;

                    const absCount = Math.abs(count);
                    const isBlack = count < 0;

                    for (let j = 0; j < absCount; j++) {
                        // Stack logic to handle overflowing checkers
                        const maxStackHeight = POINT_H;
                        const spacing = Math.min(CHECKER_R * 2 + 2, (maxStackHeight - CHECKER_R) / Math.max(1, absCount - 1));

                        const y = isTop
                            ? MARGIN_V + CHECKER_R + 5 + j * spacing
                            : HEIGHT - MARGIN_V - CHECKER_R - 5 - j * spacing;

                        drawSingleChecker(ctx, xBase, y, CHECKER_R, isBlack);
                    }
                }
            };

            const drawSingleChecker = (ctx, x, y, r, isBlack) => {
                ctx.save();

                // 1. Drop Shadow (Matching the SVG dilate + blur filter)
                // Change from 8 to 12-15 for more "lift"
                ctx.shadowColor = 'rgba(0, 0, 0, 0.45)'; // Increased from 0.25 to 0.45
                ctx.shadowBlur = 12;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;

                // 2. Base Circle (fill="#9B5A3D" or "#190802")
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2);
                ctx.fillStyle = isBlack ? '#190802' : '#9B5A3D';
                ctx.fill();

                // 3. Stroke (The outline: stroke="#5B321E" or "#4E3529")
                ctx.shadowBlur = 0;
                ctx.strokeStyle = isBlack ? '#4E3529' : '#5B321E';
                ctx.lineWidth = 1;
                ctx.stroke();

                // 4. Inner Shadows (The 3D bevel effect)
                ctx.save();
                ctx.clip(); // Mask shadows inside the circle

                // Dark Inner Shadow (Bottom-Right)
                ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
                ctx.shadowBlur = 2;
                ctx.shadowOffsetX = 2;
                ctx.shadowOffsetY = 2;
                ctx.stroke();

                // Amber Highlight Inner Shadow (Top-Left)
                ctx.shadowColor = 'rgba(242, 172, 102, 0.25)';
                ctx.shadowBlur = 2;
                ctx.shadowOffsetX = -2;
                ctx.shadowOffsetY = -2;
                ctx.stroke();

                ctx.restore();
                ctx.restore();
            };
            const drawUI = () => {
                // --- Left Panel: Scores ---
                // Top Box
                drawLCDBox(15, HEIGHT / 2 - 60, SIDEBAR_WIDTH - 30, 30, p1Score.toString(), '#b25e34');

                // Center Circle Button
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
                ctx.textBaseline = 'middle';
                ctx.fillText('1', SIDEBAR_WIDTH / 2, HEIGHT / 2);

                // Bottom Box
                drawLCDBox(15, HEIGHT / 2 + 30, SIDEBAR_WIDTH - 30, 30, p2Score.toString(), '#b25e34');
            };

            const drawLCDBox = (x: number, y: number, w: number, h: number, text: string, color: string) => {
                ctx.save();
                // Frame
                ctx.fillStyle = '#3e2315';
                ctx.fillRect(x, y, w, h);
                // Screen
                ctx.fillStyle = color;
                ctx.fillRect(x + 4, y + 4, w - 8, h - 8);
                // Text
                ctx.fillStyle = '#ffdab9';
                ctx.font = 'bold 24px "Courier New", monospace';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.shadowColor = 'orange';
                ctx.shadowBlur = 5;
                ctx.fillText(text, x + w / 2, y + h / 2);
                ctx.restore();
            };

            // --- Execute Draws ---
            drawWoodTexture(
                SIDEBAR_WIDTH + QUADRANT_WIDTH,
                0,
                BAR_WIDTH,
                HEIGHT,
                '#6f432a',
                '#3e2315',
                0.2
            );

            // Inner shadow for depth
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'rgba(0,0,0,0.6)';
            // ctx.shadowInset = true;
            ctx.strokeStyle = 'rgba(40, 20, 10, 0.8)';
            ctx.lineWidth = 4;
            ctx.strokeRect(SIDEBAR_WIDTH, MARGIN_V, QUADRANT_WIDTH, HEIGHT - MARGIN_V * 2);
            ctx.strokeRect(SIDEBAR_WIDTH + QUADRANT_WIDTH + BAR_WIDTH, MARGIN_V, QUADRANT_WIDTH, HEIGHT - MARGIN_V * 2);
            ctx.shadowBlur = 0;

            drawMainBoard()
            drawSideTray(ctx, 10, MARGIN_V, SIDEBAR_WIDTH - 20, HEIGHT - (MARGIN_V * 2));
            drawSideTray(ctx, WIDTH - SIDEBAR_WIDTH + 10, MARGIN_V, SIDEBAR_WIDTH - 20, HEIGHT - (MARGIN_V * 2));
            drawPoints();
            drawCheckers();
            drawUI();

        }, [board, p1Score, p2Score]);


        // Click Handler with layout logic
        const handleCanvasClick = (e: React.MouseEvent) => {
            const rect = canvasRef.current!.getBoundingClientRect();
            const scaleX = WIDTH / rect.width;
            const scaleY = HEIGHT / rect.height;
            const x = (e.clientX - rect.left) * scaleX;
            const y = (e.clientY - rect.top) * scaleY;

            // Check valid click zones
            const inLeftQuad = x > SIDEBAR_WIDTH && x < SIDEBAR_WIDTH + QUADRANT_WIDTH;
            const inRightQuad = x > SIDEBAR_WIDTH + QUADRANT_WIDTH + BAR_WIDTH && x < WIDTH - SIDEBAR_WIDTH;

            if (!inLeftQuad && !inRightQuad) return;

            let pointIdx = -1;
            const isTop = y < HEIGHT / 2;

            if (isTop) {
                if (inLeftQuad) {
                    // 12-17
                    const offset = Math.floor((x - SIDEBAR_WIDTH) / POINT_W);
                    pointIdx = 12 + offset;
                } else {
                    // 18-23
                    const offset = Math.floor((x - (SIDEBAR_WIDTH + QUADRANT_WIDTH + BAR_WIDTH)) / POINT_W);
                    pointIdx = 18 + offset;
                }
            } else {
                if (inLeftQuad) {
                    // 11-6
                    const offset = Math.floor((x - SIDEBAR_WIDTH) / POINT_W);
                    pointIdx = 11 - offset;
                } else {
                    // 5-0
                    const offset = Math.floor((x - (SIDEBAR_WIDTH + QUADRANT_WIDTH + BAR_WIDTH)) / POINT_W);
                    pointIdx = 5 - offset;
                }
            }


        };

        return (
            <div className="flex justify-center items-center p-4 bg-gray-900 min-h-screen bg-[#1a1a1a]">
                <canvas
                    ref={canvasRef}
                    width={WIDTH}
                    height={HEIGHT}
                    onClick={handleCanvasClick}
                    className="rounded-lg shadow-2xl cursor-pointer max-w-full h-auto border border-[#3e2315]"
                    style={{
                        boxShadow: '0 20px 50px rgba(0,0,0,0.9)'
                    }}
                />
            </div>
        );
    };

    export default BackgammonBoard;