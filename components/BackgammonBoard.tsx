import React, { useRef, useEffect } from 'react';
import { BoardState } from '../types';

interface Props {
  board: BoardState;
  onPointClick: (index: number) => void;
  // Optional scores for the left panel
  p1Score?: number;
  p2Score?: number;
}

const BackgammonBoard: React.FC<Props> = ({ board, onPointClick, p1Score = 88, p2Score = 51 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // General Dimensions
  const WIDTH = 1100; // Slightly wider to accommodate side panels
  const HEIGHT = 700;

  // Section Dimensions
  const SIDEBAR_WIDTH = 90; // Left and Right panels
  const BAR_WIDTH = 50;     // Center hinge/bar
  const MARGIN_V = 30;      // Vertical margin

  // Play Area Calculations
  const PLAY_AREA_WIDTH = WIDTH - (SIDEBAR_WIDTH * 2) - BAR_WIDTH;
  const QUADRANT_WIDTH = PLAY_AREA_WIDTH / 2;
  const POINT_W = QUADRANT_WIDTH / 6;
  const POINT_H = HEIGHT * 0.4;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // --- Drawing Helper Functions ---

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

      // Center Bar (Hinge)
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
      ctx.shadowInset = true;
      ctx.strokeStyle = 'rgba(40, 20, 10, 0.8)';
      ctx.lineWidth = 4;
      ctx.strokeRect(SIDEBAR_WIDTH, MARGIN_V, QUADRANT_WIDTH, HEIGHT - MARGIN_V * 2);
      ctx.strokeRect(SIDEBAR_WIDTH + QUADRANT_WIDTH + BAR_WIDTH, MARGIN_V, QUADRANT_WIDTH, HEIGHT - MARGIN_V * 2);
      ctx.shadowBlur = 0;
    };

    // const drawPoints = () => {
    //   for (let i = 0; i < 24; i++) {
    //     const isTop = i >= 12;
    //     let x = 0;
    //     let y = isTop ? MARGIN_V : HEIGHT - MARGIN_V;
    //
    //     // Calculate X position based on index and layout
    //     // 0-5: Bottom Right | 6-11: Bottom Left | 12-17: Top Left | 18-23: Top Right
    //     if (i < 6) {
    //       x = WIDTH - SIDEBAR_WIDTH - (i + 1) * POINT_W;
    //     } else if (i < 12) {
    //       x = SIDEBAR_WIDTH + (11 - i) * POINT_W;
    //     } else if (i < 18) {
    //       x = SIDEBAR_WIDTH + (i - 12) * POINT_W;
    //     } else {
    //       x = WIDTH - SIDEBAR_WIDTH - (23 - i + 1) * POINT_W;
    //     }
    //
    //     const tipY = isTop ? y + POINT_H : y - POINT_H;
    //     const isDark = i % 2 === 0;
    //
    //     if (isDark) {
    //       // --- DARK TRIANGLES (Red with Gold Border) ---
    //
    //       // 1. Base Dark Red Triangle
    //       ctx.beginPath();
    //       ctx.moveTo(x, y);
    //       ctx.lineTo(x + POINT_W / 2, tipY);
    //       ctx.lineTo(x + POINT_W, y);
    //       ctx.closePath();
    //       ctx.fillStyle = '#7a1f1f'; // Deep Maroon/Burgundy
    //       ctx.fill();
    //
    //       // 2. Inner Gold/Yellow Border
    //       // We calculate a slightly smaller triangle inside
    //       const inset = 6; // How far the line is from the edge
    //       const innerTipY = isTop ? tipY - 15 : tipY + 15; // Tip is slightly blunt/lower
    //
    //       ctx.beginPath();
    //       // Start point (Left Base)
    //       ctx.moveTo(x + inset, y);
    //       // Tip Point
    //       ctx.lineTo(x + POINT_W / 2, innerTipY);
    //       // End Point (Right Base)
    //       ctx.lineTo(x + POINT_W - inset, y);
    //       // Close loop back to start
    //       ctx.lineTo(x + inset, y);
    //
    //       ctx.strokeStyle = '#eeb558'; // Gold/Amber color
    //       ctx.lineWidth = 2;
    //       ctx.lineJoin = 'round'; // Smooth corners
    //       ctx.stroke();
    //
    //     } else {
    //       // --- LIGHT TRIANGLES (Standard Light Wood) ---
    //       ctx.beginPath();
    //       ctx.moveTo(x, y);
    //       ctx.lineTo(x + POINT_W / 2, tipY);
    //       ctx.lineTo(x + POINT_W, y);
    //       ctx.closePath();
    //       ctx.fillStyle = '#deb887'; // Light wood color
    //       ctx.fill();
    //     }
    //
    //     // Optional: Very subtle outline for all points for crispness
    //     ctx.beginPath();
    //     ctx.moveTo(x, y);
    //     ctx.lineTo(x + POINT_W / 2, tipY);
    //     ctx.lineTo(x + POINT_W, y);
    //     ctx.closePath();
    //     ctx.strokeStyle = 'rgba(0,0,0,0.1)';
    //     ctx.lineWidth = 1;
    //     ctx.stroke();
    //   }
    // };


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
        const isDark = i % 2 === 0;

        if (isDark) {
          // --- RED TRIANGLE (SVG BASED) ---
          ctx.save();

          // 1. Drop Shadow (from filter0_d_1_394)
          ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
          ctx.shadowBlur = 4; // stdDeviation="2"
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;

          // 2. Base Shape (Outer Red Triangle)
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + POINT_W / 2, tipY);
          ctx.lineTo(x + POINT_W, y);
          ctx.closePath();
          ctx.fillStyle = '#872727';
          ctx.fill();

          // Reset shadow for the inner stroke
          ctx.shadowBlur = 0;

          // 3. Inner Triangle with Stroke (The Orange Highlight)
          // Using slight insets to match the SVG path coordinates
          const insetX = POINT_W * 0.15;
          const insetY = POINT_H * 0.05;
          const innerTipY = isTop ? tipY - insetY * 5 : tipY + insetY * 5;

          ctx.beginPath();
          ctx.moveTo(x + insetX, isTop ? y + 5 : y - 5);
          ctx.lineTo(x + POINT_W / 2, innerTipY);
          ctx.lineTo(x + POINT_W - insetX, isTop ? y + 5 : y - 5);
          ctx.closePath();

          ctx.strokeStyle = '#E99950';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          ctx.restore();
        } else {
// --- LIGHT TRIANGLE (SVG BASED) ---
          ctx.save();

          // 1. Drop Shadow (Matching the SVG feGaussianBlur stdDeviation="2")
          ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
          ctx.shadowBlur = 4;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;

          // 2. Base Shape (Outer Light Triangle) - Color: #F2AC66
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + POINT_W / 2, tipY);
          ctx.lineTo(x + POINT_W, y);
          ctx.closePath();
          ctx.fillStyle = '#F2AC66';
          ctx.fill();

          // Reset shadow for the inner decorative line
          ctx.shadowBlur = 0;

          // 3. Inner Triangle with Stroke - Color: #E99950
          const insetX = POINT_W * 0.15;
          const innerTipY = isTop ? tipY - 15 : tipY + 15;

          ctx.beginPath();
          ctx.moveTo(x + insetX, isTop ? y + 5 : y - 5);
          ctx.lineTo(x + POINT_W / 2, innerTipY);
          ctx.lineTo(x + POINT_W - insetX, isTop ? y + 5 : y - 5);
          ctx.closePath();

          ctx.strokeStyle = '#E99950';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          ctx.restore();        }
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

    // const drawSingleChecker = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number, isBlack: boolean) => {
    //   ctx.save();
    //
    //   // Shadow
    //   ctx.shadowColor = 'rgba(0,0,0,0.5)';
    //   ctx.shadowBlur = 6;
    //   ctx.shadowOffsetX = 2;
    //   ctx.shadowOffsetY = 2;
    //
    //   ctx.beginPath();
    //   ctx.arc(x, y, r, 0, Math.PI * 2);
    //
    //   // Body Gradient (Matte Wood look)
    //   const grad = ctx.createRadialGradient(x - r/3, y - r/3, r/4, x, y, r);
    //   if (isBlack) {
    //     grad.addColorStop(0, '#2e1e1e'); // Dark Brown
    //     grad.addColorStop(1, '#0f0808'); // Black
    //   } else {
    //     grad.addColorStop(0, '#bf8f6b'); // Light Brown
    //     grad.addColorStop(1, '#8a624a'); // Darker Brown
    //   }
    //   ctx.fillStyle = grad;
    //   ctx.fill();
    //
    //   ctx.shadowBlur = 0;
    //   ctx.shadowOffsetX = 0;
    //   ctx.shadowOffsetY = 0;
    //
    //   // Inner Decorative Ring (Bevel)
    //   ctx.beginPath();
    //   ctx.arc(x, y, r * 0.7, 0, Math.PI * 2);
    //   ctx.strokeStyle = isBlack ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
    //   ctx.lineWidth = 3;
    //   ctx.stroke();
    //
    //   // Outer Border
    //   ctx.beginPath();
    //   ctx.arc(x, y, r, 0, Math.PI * 2);
    //   ctx.strokeStyle = 'rgba(0,0,0,0.3)';
    //   ctx.lineWidth = 1;
    //   ctx.stroke();
    //
    //   ctx.restore();
    // };

    const drawSingleChecker = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number, isBlack: boolean) => {
      ctx.save();

      // 1. Dilation/Outer Shadow (Simulating the SVG Filter feMorphology + feGaussianBlur)
      // The SVG uses a dilation radius of 3 and blur of 2.5
      ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      // 2. Main Circle Body
      // Using the SVG fill color #9B5A3D for brown and #1A1A1A for black
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = isBlack ? '#1A1A1A' : '#9B5A3D';
      ctx.fill();

      // Reset shadow for inner details
      ctx.shadowBlur = 0;

      // 3. Stroke/Border (The SVG cx="25.5" cy="25.5" r="17" stroke="#5B321E")
      ctx.beginPath();
      ctx.arc(x, y, r - 0.5, 0, Math.PI * 2);
      ctx.strokeStyle = isBlack ? '#000000' : '#5B321E';
      ctx.lineWidth = 1;
      ctx.stroke();

      // 4. Inner Shadow - Bottom Right (Simulating SVG feOffset dx="2" dy="2")
      ctx.save();
      ctx.clip(); // Ensure inner shadow stays inside the circle
      ctx.beginPath();
      ctx.arc(x + 2, y + 2, r, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.lineWidth = 4;
      ctx.shadowBlur = 4;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.stroke();
      ctx.restore();

      // 5. Inner Shadow - Top Left (Simulating SVG feOffset dx="-2" dy="-2" color #F2AC66)
      ctx.save();
      ctx.clip();
      ctx.beginPath();
      ctx.arc(x - 2, y - 2, r, 0, Math.PI * 2);
      // Using the light amber color from the SVG filter for the highlight shadow
      ctx.strokeStyle = isBlack ? 'rgba(255, 255, 255, 0.1)' : 'rgba(242, 172, 102, 0.4)';
      ctx.lineWidth = 4;
      ctx.shadowBlur = 4;
      ctx.shadowColor = isBlack ? 'rgba(255, 255, 255, 0.2)' : 'rgba(242, 172, 102, 0.5)';
      ctx.stroke();
      ctx.restore();

      // 6. Center Detail (The "Golden Ring" aesthetic from your previous reference)
      ctx.beginPath();
      ctx.arc(x, y, r * 0.65, 0, Math.PI * 2);
      ctx.strokeStyle = isBlack ? 'rgba(255, 255, 255, 0.05)' : 'rgba(91, 50, 30, 0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();
    };
    const drawUI = () => {
      // --- Left Panel: Scores ---
      // Top Box
      drawLCDBox(10, 250, SIDEBAR_WIDTH - 20, 50, p1Score.toString(), '#b25e34');

      // Center Circle Button
      ctx.beginPath();
      ctx.arc(SIDEBAR_WIDTH / 2, HEIGHT / 2, 20, 0, Math.PI * 2);
      const btnGrad = ctx.createRadialGradient(SIDEBAR_WIDTH/2, HEIGHT/2, 5, SIDEBAR_WIDTH/2, HEIGHT/2, 20);
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
      drawLCDBox(10, 400, SIDEBAR_WIDTH - 20, 50, p2Score.toString(), '#b25e34');

      // --- Right Panel: Trays ---
      // Graphic representation of recessed trays
      drawRecessedTray(WIDTH - SIDEBAR_WIDTH + 10, 100, SIDEBAR_WIDTH - 20, 200);
      drawRecessedTray(WIDTH - SIDEBAR_WIDTH + 10, HEIGHT - 300, SIDEBAR_WIDTH - 20, 200);
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
      ctx.fillText(text, x + w/2, y + h/2);
      ctx.restore();
    };

    const drawRecessedTray = (x: number, y: number, w: number, h: number) => {
      ctx.save();
      ctx.fillStyle = '#4a2e1d';
      ctx.fillRect(x, y, w, h);
      // Inner shadow
      ctx.strokeStyle = 'rgba(0,0,0,0.5)';
      ctx.lineWidth = 4;
      ctx.strokeRect(x, y, w, h);
      // Bottom Highlight
      ctx.beginPath();
      ctx.moveTo(x, y + h);
      ctx.lineTo(x + w, y + h);
      ctx.strokeStyle = 'rgba(255,255,255,0.1)';
      ctx.stroke();
      ctx.restore();
    };

    // --- Execute Draws ---
    drawMainBoard();
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

    if (pointIdx >= 0 && pointIdx <= 23) {
      onPointClick(pointIdx);
    }
  };

  return (
      <div className="flex justify-center items-center p-4 bg-gray-900 min-h-screen">
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