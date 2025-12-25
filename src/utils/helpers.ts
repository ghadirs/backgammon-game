import React from "react";
import {DIMENSIONS} from "@/variables";

const {
    WIDTH, HEIGHT, SIDEBAR_WIDTH, MARGIN_V, QUADRANT_WIDTH, POINT_H, CHECKER_R, POINT_W
} = DIMENSIONS;

// --- HELPER: CLICK DETECTION ---
export const getInternalCoords = (e: React.MouseEvent, canvas) => {
    if (!canvas) return {x: 0, y: 0};
    const rect = canvas.getBoundingClientRect();
    const scaleX = WIDTH / rect.width;
    const scaleY = HEIGHT / rect.height;
    return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
    };
};

export const getPointAtCoords = (
    mx: number,
    my: number,
) => {
    const isTopHalf = my < HEIGHT / 2;
    const leftZone = mx > SIDEBAR_WIDTH && mx < SIDEBAR_WIDTH + QUADRANT_WIDTH;
    const rightZone =
        mx > WIDTH - SIDEBAR_WIDTH - QUADRANT_WIDTH &&
        mx < WIDTH - SIDEBAR_WIDTH;

    if (isTopHalf) {
        if (leftZone) return 12 + Math.floor((mx - SIDEBAR_WIDTH) / POINT_W);
        if (rightZone)
            return (
                18 +
                Math.floor((mx - (WIDTH - SIDEBAR_WIDTH - QUADRANT_WIDTH)) / POINT_W)
            );
    } else {
        if (rightZone)
            return (
                5 -
                Math.floor((mx - (WIDTH - SIDEBAR_WIDTH - QUADRANT_WIDTH)) / POINT_W)
            );
        if (leftZone) return 11 - Math.floor((mx - SIDEBAR_WIDTH) / POINT_W);
    }
    return -1;
};

export const getCheckerPixels = (i: number, stackIdx: number) => {
    // Exact same math as your draw loop
    const isTop = i >= 12;
    const xBase =
        i < 6
            ? WIDTH - SIDEBAR_WIDTH - (i + 0.5) * POINT_W
            : i < 12
                ? SIDEBAR_WIDTH + (11 - i + 0.5) * POINT_W
                : i < 18
                    ? SIDEBAR_WIDTH + (i - 12 + 0.5) * POINT_W
                    : WIDTH - SIDEBAR_WIDTH - (23 - i + 0.5) * POINT_W;

    // Use a fixed spacing or the dynamic one from your loop
    const absCountForSpacing = 5; // Use a predictable value for the target or calculate based on board
    const spacing = Math.min(
        CHECKER_R * 2 + 2,
        (POINT_H - CHECKER_R) / Math.max(1, absCountForSpacing),
    );

    const y = isTop
        ? MARGIN_V + CHECKER_R + 5 + stackIdx * spacing
        : HEIGHT - MARGIN_V - CHECKER_R - 5 - stackIdx * spacing;

    return {x: xBase, y};
};

// --- NEW HELPER: Single Source of Truth for Bear Off Positions ---
export const getBearOffPos = (player: number, stackIndex: number) => {
    // X is center of Right Sidebar
    const x = WIDTH - SIDEBAR_WIDTH / 2;

    // Player 1 (White/Positive): Bottom Right Tray
    // Player 2 (Black/Negative): Top Right Tray
    // (Adjust this Top/Bottom logic to match your specific board preference)
    const isPlayer1 = player === 1;

    // Base Y position for the "First" checker in the stack
    // Player 2 starts at top (MARGIN_V + 40)
    // Player 1 starts at bottom (HEIGHT - MARGIN_V - 40)
    const baseY = isPlayer1
        ? HEIGHT - MARGIN_V - 40
        : MARGIN_V + 40;

    // Direction to stack: Player 1 stacks UP (-1), Player 2 stacks DOWN (+1)
    const direction = isPlayer1 ? -1 : 1;

    // The gap between checkers in the tray (flattened look)
    const stackGap = 10;

    return {
        x: x,
        y: baseY + (stackIndex * stackGap * direction)
    };
};


