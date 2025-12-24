import React from "react";

// --- HELPER: CLICK DETECTION ---
export const getInternalCoords = (
  e: React.MouseEvent,
  canvas,
  logicalWidth,
  logicalHeight,
) => {
  if (!canvas) return { x: 0, y: 0 };
  const rect = canvas.getBoundingClientRect();
  const scaleX = logicalWidth / rect.width;
  const scaleY = logicalHeight / rect.height;
  return {
    x: (e.clientX - rect.left) * scaleX,
    y: (e.clientY - rect.top) * scaleY,
  };
};

export const getPointAtCoords = (
  mx: number,
  my: number,
  logicalWidth,
  logicalHeight,
  sidebarWidth,
  qWidth,
  pointWidth,
) => {
  const isTopHalf = my < logicalHeight / 2;
  const leftZone = mx > sidebarWidth && mx < sidebarWidth + qWidth;
  const rightZone =
    mx > logicalWidth - sidebarWidth - qWidth &&
    mx < logicalWidth - sidebarWidth;

  if (isTopHalf) {
    if (leftZone) return 12 + Math.floor((mx - sidebarWidth) / pointWidth);
    if (rightZone)
      return (
        18 +
        Math.floor((mx - (logicalWidth - sidebarWidth - qWidth)) / pointWidth)
      );
  } else {
    if (rightZone)
      return (
        5 -
        Math.floor((mx - (logicalWidth - sidebarWidth - qWidth)) / pointWidth)
      );
    if (leftZone) return 11 - Math.floor((mx - sidebarWidth) / pointWidth);
  }
  return -1;
};

export const getCheckerPixels = (
  i: number,
  stackIdx: number,
  logicalWidth: number,
  logicalHeight: number,
  sidebarWidth: number,
  pointWidth: number,
  pointHeight: number,
  checkerR: number,
  marginV: number,
) => {
  // Exact same math as your draw loop
  const isTop = i >= 12;
  const xBase =
    i < 6
      ? logicalWidth - sidebarWidth - (i + 0.5) * pointWidth
      : i < 12
        ? sidebarWidth + (11 - i + 0.5) * pointWidth
        : i < 18
          ? sidebarWidth + (i - 12 + 0.5) * pointWidth
          : logicalWidth - sidebarWidth - (23 - i + 0.5) * pointWidth;

  // Use a fixed spacing or the dynamic one from your loop
  const absCountForSpacing = 5; // Use a predictable value for the target or calculate based on board
  const spacing = Math.min(
    checkerR * 2 + 2,
    (pointHeight - checkerR) / Math.max(1, absCountForSpacing),
  );

  const y = isTop
    ? marginV + checkerR + 5 + stackIdx * spacing
    : logicalHeight - marginV - checkerR - 5 - stackIdx * spacing;

  return { x: xBase, y };
};
