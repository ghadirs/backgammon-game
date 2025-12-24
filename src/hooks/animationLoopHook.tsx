import { useEffect } from "react";
import {
  drawCenterBar,
  drawLCDBox,
  drawPoints,
  drawSideTray,
  drawSolidCube,
  drawWoodTexture,
} from "@/utils/gameGeometry.ts";
import { Player, AnimatingChecker, BoardState } from "@/types";

// --- DIMENSIONS ---
const WIDTH = 1100;
const HEIGHT = 700;
const SIDEBAR_WIDTH = 80;
const MARGIN_V = 10;
const BAR_WIDTH = 60;
const BAR_H = HEIGHT - MARGIN_V * 2;
const PLAY_AREA_WIDTH = WIDTH - SIDEBAR_WIDTH * 2 - BAR_WIDTH;
const QUADRANT_WIDTH = PLAY_AREA_WIDTH / 2;
const POINT_W = QUADRANT_WIDTH / 6;
const POINT_H = HEIGHT * 0.4;
const CHECKER_R = POINT_W * 0.43;
const ANIMATION_DURATION = 300; // ms

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
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      ctx.drawImage(boardCache.current!, 0, 0);
      pulseRef.current = (pulseRef.current + 0.05) % (Math.PI * 2);

      // --- TURN HIGHLIGHT LOGIC ---
      // Change this logic based on your actual turn variable (e.g., board.currentPlayer)
      const isBottomTurn = currentPlayer === 1;

      // 3. DRAW DYNAMIC STUFF
      drawLCDBox(
        ctx,
        15,
        HEIGHT / 2 - 60,
        SIDEBAR_WIDTH - 30,
        30,
        p1Score.toString(),
        "#b25e34",
      );

      // Score Circle
      ctx.beginPath();
      ctx.arc(SIDEBAR_WIDTH / 2, HEIGHT / 2, 20, 0, Math.PI * 2);
      const btnGrad = ctx.createRadialGradient(
        SIDEBAR_WIDTH / 2,
        HEIGHT / 2,
        5,
        SIDEBAR_WIDTH / 2,
        HEIGHT / 2,
        20,
      );
      btnGrad.addColorStop(0, "#800000");
      btnGrad.addColorStop(1, "#400000");
      ctx.fillStyle = btnGrad;
      ctx.fill();
      ctx.strokeStyle = "#cca";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = "#cca";
      ctx.font = "bold 16px Arial";
      ctx.textAlign = "center";
      ctx.fillText("1", SIDEBAR_WIDTH / 2, HEIGHT / 2 + 5);

      drawLCDBox(
        ctx,
        15,
        HEIGHT / 2 + 30,
        SIDEBAR_WIDTH - 30,
        30,
        p2Score.toString(),
        "#b25e34",
      );

      ctx.save();
      // 1. Calculate the pulse value FIRST (oscillates opacity between 0.1 and 0.4)
      const pulse = 0.4 + Math.sin(Date.now() / 500) * 0.15; // Oscillates between 0.05 and 0.15
      const glowHeight = HEIGHT * 0.45; // Glow covers roughly half the board height
      const highlightGrad = ctx.createLinearGradient(
        0,
        isBottomTurn ? HEIGHT : 0,
        0,
        isBottomTurn ? HEIGHT - glowHeight : glowHeight,
      );

      // 2. Create the gradient
      highlightGrad.addColorStop(0, "rgba(0, 150, 255, 0.75)");
      highlightGrad.addColorStop(1, "rgba(0, 150, 255, 0)");

      // 3. Apply the dynamic pulse to the gradient stops
      highlightGrad.addColorStop(0, `rgba(0, 150, 255, ${pulse})`);

      // 4. Fill the rectangle
      ctx.fillStyle = highlightGrad;
      if (isBottomTurn) {
        ctx.fillRect(
          SIDEBAR_WIDTH,
          HEIGHT - glowHeight,
          PLAY_AREA_WIDTH + BAR_WIDTH,
          glowHeight,
        );
      } else {
        ctx.fillRect(SIDEBAR_WIDTH, 0, PLAY_AREA_WIDTH + BAR_WIDTH, glowHeight);
      }
      ctx.restore();

      // 5. Draw the glowing edge line (also pulsing!)
      ctx.strokeStyle = "rgba(0, 180, 255, 0.4)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      if (isBottomTurn) {
        ctx.moveTo(SIDEBAR_WIDTH, HEIGHT - 2);
        ctx.lineTo(WIDTH - SIDEBAR_WIDTH, HEIGHT - 2);
      } else {
        ctx.moveTo(SIDEBAR_WIDTH, 2);
        ctx.lineTo(WIDTH - SIDEBAR_WIDTH, 2);
      }
      ctx.stroke();

      // Checkers
      // 2. Draw Checkers on Points
      boardRef.current.points.forEach((count, i) => {
        if (count === 0) return;
        const isTop = i >= 12;
        let xBase =
          i < 6
            ? WIDTH - SIDEBAR_WIDTH - (i + 0.5) * POINT_W
            : i < 12
              ? SIDEBAR_WIDTH + (11 - i + 0.5) * POINT_W
              : i < 18
                ? SIDEBAR_WIDTH + (i - 12 + 0.5) * POINT_W
                : WIDTH - SIDEBAR_WIDTH - (23 - i + 0.5) * POINT_W;

        let absCount = Math.abs(count);

        const spacing = Math.min(
          CHECKER_R * 2 + 2,
          (POINT_H - CHECKER_R) / Math.max(1, absCount - 1),
        );

        for (let j = 0; j < absCount; j++) {
          // NEW: If this specific checker is currently "flying", don't draw it on the point
          const isAnimatingThisPoint =
            animatingChecker &&
            animatingChecker.fromIdx === i &&
            j === absCount - 1;

          if (isAnimatingThisPoint) continue;

          const y = isTop
            ? MARGIN_V + CHECKER_R + 5 + j * spacing
            : HEIGHT - MARGIN_V - CHECKER_R - 5 - j * spacing;
          ctx.save();

          // --- NEW: Highlight the TOP checker if it belongs to the current player ---
          if (
            j === absCount - 1 &&
            Math.sign(count) === currentPlayer &&
            !isRolling
          ) {
            // Inside boardRef.current.points.forEach...
            const isMyChecker = Math.sign(count) === currentPlayer;
            const isTopChecker = j === absCount - 1;
            // 1. Calculate possible target indices based on current dice
            const moveDir = currentPlayer === 1 ? 1 : -1;
            const canMove = playableMoves.some((die) => {
              const targetIdx = i + die * moveDir;
              if (targetIdx < 0 || targetIdx > 23) return false;

              const targetPoint = boardRef.current.points[targetIdx];
              // A move is valid if the target is NOT blocked by 2+ opponents
              const isBlocked =
                Math.sign(targetPoint) === -currentPlayer &&
                Math.abs(targetPoint) >= 2;

              return !isBlocked;
            });
            // 2. Only highlight if it's yours AND it's not blocked
            if (isTopChecker && isMyChecker && !isRolling && canMove) {
              ctx.shadowBlur = 10 + Math.sin(pulseRef.current) * 5;
              ctx.shadowColor = currentPlayer === 1 ? "#00ffff" : "#ff00ff";
              ctx.strokeStyle = currentPlayer === 1 ? "#00ffff" : "#ff00ff";
              ctx.lineWidth = 3;
              ctx.beginPath();
              ctx.arc(xBase, y, CHECKER_R + 2, 0, Math.PI * 2);
              ctx.stroke();
            }
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

      if (animatingChecker) {
        const elapsed = time - animatingChecker.startTime;
        const progress = Math.min(elapsed / ANIMATION_DURATION, 1);

        // Easing function for smoothness
        const ease =
          progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        const currentX =
          animatingChecker.fromX +
          (animatingChecker.toX - animatingChecker.fromX) * ease;
        const currentY =
          animatingChecker.fromY +
          (animatingChecker.toY - animatingChecker.fromY) * ease;

        // Add a "Hop" effect (Parabola)
        const hopHeight = 50;
        const jumpY = currentY - Math.sin(progress * Math.PI) * hopHeight;

        // Draw the flying checker
        ctx.save();
        ctx.shadowBlur = 15;
        ctx.shadowOffsetY = 10;
        ctx.shadowColor = "rgba(0,0,0,0.5)";
        ctx.beginPath();
        ctx.arc(currentX, jumpY, CHECKER_R * 1.1, 0, Math.PI * 2);
        ctx.fillStyle = animatingChecker.color < 0 ? "#190802" : "#9B5A3D";
        ctx.fill();
        ctx.restore();

        // Inside the animate loop, where progress >= 1
        if (progress >= 1) {
          const savedFinalState = animatingChecker.newPoints;
          setAnimatingChecker(null); // Clear animation first

          // Wrap in a timeout or microtask to ensure the state
          // update doesn't interfere with the current frame
          setTimeout(() => {
            if (onMoveExecuted) onMoveExecuted(savedFinalState);
          }, 0);
        }
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
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    // START ANIMATION
    requestRef.current = requestAnimationFrame(animate);

    if (!isRolling && !animatingChecker) {
      // temp
      console.log("player: ", currentPlayer);
      console.log("dice: ", diceValues);
      console.log("board: ", board);
    }

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [
    isClient,
    diceValues,
    isRolling,
    currentPlayer,
    animatingChecker,
    playableMoves,
  ]);
};
