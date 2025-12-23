import React from "react";


// --- HELPER: CLICK DETECTION ---
export const getInternalCoords = (e: React.MouseEvent, canvas, logicalWidth, logicalHeight) => {

    if (!canvas) return {x: 0, y: 0};
    const rect = canvas.getBoundingClientRect();
    const scaleX = logicalWidth / rect.width;
    const scaleY = logicalHeight / rect.height;
    return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
    };
};

export const getPointAtCoords = (mx: number, my: number, logicalWidth, logicalHeight, sidebarWidth, qWidth, pointWidth,) => {
    const isTopHalf = my < logicalHeight / 2;
    const leftZone = mx > sidebarWidth && mx < sidebarWidth + qWidth;
    const rightZone = mx > logicalWidth - sidebarWidth - qWidth && mx < logicalWidth - sidebarWidth;

    if (isTopHalf) {
        if (leftZone) return 12 + Math.floor((mx - sidebarWidth) / pointWidth);
        if (rightZone) return 18 + Math.floor((mx - (logicalWidth - sidebarWidth - qWidth)) / pointWidth);
    } else {
        if (rightZone) return 5 - Math.floor((mx - (logicalWidth - sidebarWidth - qWidth)) / pointWidth);
        if (leftZone) return 11 - Math.floor((mx - sidebarWidth) / pointWidth);
    }
    return -1;
};