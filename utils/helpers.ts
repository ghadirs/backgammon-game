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

import React from "react";

export const getCheckerPixels = (i: number, stackIdx: number) => {
    const isTop = i >= 12;
    let xBase = (i < 6) ? WIDTH - SIDEBAR_WIDTH - (i + 0.5) * POINT_W :
        (i < 12) ? SIDEBAR_WIDTH + (11 - i + 0.5) * POINT_W :
            (i < 18) ? SIDEBAR_WIDTH + (i - 12 + 0.5) * POINT_W :
                WIDTH - SIDEBAR_WIDTH - (23 - i + 0.5) * POINT_W;

    const spacing = Math.min(CHECKER_R * 2 + 2, (POINT_H - CHECKER_R) / 5);
    const y = isTop ? MARGIN_V + CHECKER_R + 5 + stackIdx * spacing :
        HEIGHT - MARGIN_V - CHECKER_R - 5 - stackIdx * spacing;
    return {x: xBase, y};
};

// --- HELPER: CLICK DETECTION ---
export const getInternalCoords = (e: React.MouseEvent, canvas) => {

    if (!canvas) return {x: 0, y: 0};
    const rect = canvas.getBoundingClientRect();
    const scaleX = WIDTH / rect.width;
    const scaleY = HEIGHT / rect.height;
    return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
    };
};

export const getPointAtCoords = (mx: number, my: number) => {
    const isTopHalf = my < HEIGHT / 2;
    const leftZone = mx > SIDEBAR_WIDTH && mx < SIDEBAR_WIDTH + QUADRANT_WIDTH;
    const rightZone = mx > WIDTH - SIDEBAR_WIDTH - QUADRANT_WIDTH && mx < WIDTH - SIDEBAR_WIDTH;

    if (isTopHalf) {
        if (leftZone) return 12 + Math.floor((mx - SIDEBAR_WIDTH) / POINT_W);
        if (rightZone) return 18 + Math.floor((mx - (WIDTH - SIDEBAR_WIDTH - QUADRANT_WIDTH)) / POINT_W);
    } else {
        if (rightZone) return 5 - Math.floor((mx - (WIDTH - SIDEBAR_WIDTH - QUADRANT_WIDTH)) / POINT_W);
        if (leftZone) return 11 - Math.floor((mx - SIDEBAR_WIDTH) / POINT_W);
    }
    return -1;
};