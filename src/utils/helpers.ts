import React from "react";

export const getCheckerPixels = (i: number, stackIdx: number, logicalHeight, logicalWidth, sidebarWidth, pointWidth, pointHeight, marginV, checkerR) => {
    const isTop = i >= 12;
    let xBase = (i < 6) ? logicalWidth - sidebarWidth - (i + 0.5) * pointWidth :
        (i < 12) ? sidebarWidth + (11 - i + 0.5) * pointWidth :
            (i < 18) ? sidebarWidth + (i - 12 + 0.5) * pointWidth :
                logicalWidth - sidebarWidth - (23 - i + 0.5) * pointWidth;

    const spacing = Math.min(checkerR * 2 + 2, (pointHeight - checkerR) / 5);
    const y = isTop ? marginV + checkerR + 5 + stackIdx * spacing :
        logicalHeight - marginV - checkerR - 5 - stackIdx * spacing;
    return {x: xBase, y};
};

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