import React from "react";
import {DIMENSIONS} from "@/variables";

// --- HELPER: CLICK DETECTION ---
export const getInternalCoords = (e: React.MouseEvent, canvas) => {
  if (!canvas) return { x: 0, y: 0 };
  const rect = canvas.getBoundingClientRect();
  const scaleX = DIMENSIONS.WIDTH / rect.width;
  const scaleY = DIMENSIONS.HEIGHT / rect.height;
  return {
    x: (e.clientX - rect.left) * scaleX,
    y: (e.clientY - rect.top) * scaleY,
  };
};

export const getPointAtCoords = (
  mx: number,
  my: number,
  DIMENSIONS.WIDTH,
  DIMENSIONS.HEIGHT,
  DIMENSIONS.SIDEBAR_WIDTH,
  qWidth,
  pointWidth,
) => {
  const isTopHalf = my < DIMENSIONS.HEIGHT / 2;
  const leftZone = mx > DIMENSIONS.SIDEBAR_WIDTH && mx < DIMENSIONS.SIDEBAR_WIDTH + qWidth;
  const rightZone =
    mx > DIMENSIONS.WIDTH - DIMENSIONS.SIDEBAR_WIDTH - qWidth &&
    mx < DIMENSIONS.WIDTH - DIMENSIONS.SIDEBAR_WIDTH;

  if (isTopHalf) {
    if (leftZone) return 12 + Math.floor((mx - DIMENSIONS.SIDEBAR_WIDTH) / pointWidth);
    if (rightZone)
      return (
        18 +
        Math.floor((mx - (DIMENSIONS.WIDTH - DIMENSIONS.SIDEBAR_WIDTH - qWidth)) / pointWidth)
      );
  } else {
    if (rightZone)
      return (
        5 -
        Math.floor((mx - (DIMENSIONS.WIDTH - DIMENSIONS.SIDEBAR_WIDTH - qWidth)) / pointWidth)
      );
    if (leftZone) return 11 - Math.floor((mx - DIMENSIONS.SIDEBAR_WIDTH) / pointWidth);
  }
  return -1;
};

export const getCheckerPixels = (i: number, stackIdx: number) => {
  // Exact same math as your draw loop
  const isTop = i >= 12;
  const xBase =
    i < 6
      ? DIMENSIONS.WIDTH - DIMENSIONS.SIDEBAR_WIDTH - (i + 0.5) * pointWidth
      : i < 12
        ? DIMENSIONS.SIDEBAR_WIDTH + (11 - i + 0.5) * pointWidth
        : i < 18
          ? DIMENSIONS.SIDEBAR_WIDTH + (i - 12 + 0.5) * pointWidth
          : DIMENSIONS.WIDTH - DIMENSIONS.SIDEBAR_WIDTH - (23 - i + 0.5) * pointWidth;

  // Use a fixed spacing or the dynamic one from your loop
  const absCountForSpacing = 5; // Use a predictable value for the target or calculate based on board
  const spacing = Math.min(
    checkerR * 2 + 2,
    (pointHeight - checkerR) / Math.max(1, absCountForSpacing),
  );

  const y = isTop
    ? marginV + checkerR + 5 + stackIdx * spacing
    : DIMENSIONS.HEIGHT - marginV - checkerR - 5 - stackIdx * spacing;

  return { x: xBase, y };
};
