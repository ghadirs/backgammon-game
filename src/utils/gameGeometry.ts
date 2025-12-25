import { DiePhysics, Point } from "@/types";
import { DIMENSIONS } from "@/variables";

const {
  WIDTH,
  HEIGHT,
  SIDEBAR_WIDTH,
  MARGIN_V,
  BAR_WIDTH,
  BAR_H,
  POINT_W,
  POINT_H,
  QUADRANT_WIDTH,
  CHECKER_R,
} = DIMENSIONS;

// --- RESTORED ORIGINAL DRAWING HELPERS ---
export const drawWoodTexture = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  baseColor: string,
  grainColor: string,
  intensity: number,
) => {
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
  grad.addColorStop(0, "rgba(0,0,0,0.1)");
  grad.addColorStop(0.5, "rgba(255,255,255,0.05)");
  grad.addColorStop(1, "rgba(0,0,0,0.1)");
  ctx.fillStyle = grad;
  ctx.fillRect(x, y, w, h);
  ctx.restore();
};

export const drawSideTray = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
) => {
  ctx.save();
  const trayGrad = ctx.createLinearGradient(x, y, x + w, y);
  trayGrad.addColorStop(0, "#3E2315");
  trayGrad.addColorStop(0.5, "#5D3A25");
  trayGrad.addColorStop(1, "#3E2315");
  ctx.fillStyle = trayGrad;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 4);
  ctx.fill();
  ctx.strokeStyle = "rgba(0,0,0,0.3)";
  ctx.lineWidth = 2;
  ctx.stroke();

  const squareSize = w * 0.85;
  const centerX = x + (w - squareSize) / 2;
  const centerY = y + h / 2;
  const gap = 36;

  const drawInlaySquare = (posY: number) => {
    ctx.save();
    ctx.fillStyle = "#E7C697";
    ctx.shadowBlur = 4;
    ctx.shadowColor = "rgba(0,0,0,0.2)";
    ctx.fillRect(centerX, posY, squareSize, squareSize);
    ctx.strokeStyle = "rgba(255,255,255,0.2)";
    ctx.lineWidth = 1;
    ctx.strokeRect(centerX, posY, squareSize, squareSize);
    ctx.restore();
  };

  drawInlaySquare(centerY - squareSize - gap / 2);
  drawInlaySquare(centerY + gap / 2);
  ctx.restore();
};

export const drawCenterBar = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
) => {
  ctx.save();
  ctx.translate(x - BAR_WIDTH / 2, y - BAR_H / 2);
  ctx.shadowColor = "rgba(0, 0, 0, 0.25)";
  ctx.shadowBlur = 4;
  ctx.shadowOffsetY = 4;
  ctx.fillStyle = "#623D2C";
  ctx.globalCompositeOperation = "hard-light";
  ctx.fillRect(0, 0, BAR_WIDTH, BAR_H);

  ctx.save();
  ctx.clip();
  ctx.globalCompositeOperation = "source-over";
  ctx.shadowColor = "rgba(0, 0, 0, 0.25)";
  ctx.shadowBlur = 19;
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;
  ctx.strokeRect(0, 0, BAR_WIDTH, BAR_H);
  ctx.restore();
  ctx.restore();
};

export const drawLCDBox = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  text: string,
  color: string,
) => {
  ctx.save();
  ctx.fillStyle = "#3e2315";
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = color;
  ctx.fillRect(x + 4, y + 4, w - 8, h - 8);
  ctx.fillStyle = "#ffdab9";
  ctx.font = 'bold 24px "Courier New", monospace';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = "orange";
  ctx.shadowBlur = 5;
  ctx.fillText(text, x + w / 2, y + h / 2);
  ctx.restore();
};

// --- DICE GEOMETRY HELPERS ---
export const fillRoundedRect = (ctx: CanvasRenderingContext2D, r: number) => {
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

export const drawFace = (
  ctx: CanvasRenderingContext2D,
  val: number,
  origin: Point,
  u: Point,
  v: Point,
  bgColor: string,
  dotColor: string,
) => {
  ctx.save();
  ctx.transform(u.x, u.y, v.x, v.y, origin.x, origin.y);
  ctx.shadowColor = "rgba(0, 0, 0, 0.45)";
  ctx.shadowBlur = 12;
  ctx.fillStyle = bgColor;
  fillRoundedRect(ctx, 0.15);
  ctx.fillStyle = dotColor;
  const r = 0.09,
    c = 0.5,
    l = 0.22,
    h = 0.78;
  const dotsMap: Record<number, number[][]> = {
    1: [[c, c]],
    2: [
      [l, l],
      [h, h],
    ],
    3: [
      [l, l],
      [c, c],
      [h, h],
    ],
    4: [
      [l, l],
      [h, l],
      [l, h],
      [h, h],
    ],
    5: [
      [l, l],
      [h, l],
      [c, c],
      [l, h],
      [h, h],
    ],
    6: [
      [l, l],
      [h, l],
      [l, c],
      [h, c],
      [l, h],
      [h, h],
    ],
  };
  dotsMap[val]?.forEach(([dx, dy]) => {
    ctx.beginPath();
    ctx.arc(dx, dy, r, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();
};

export const drawSolidCube = (
  ctx: CanvasRenderingContext2D,
  p: DiePhysics,
  finalVal: number,
  isRolling: boolean,
) => {
  const tVal = isRolling ? Math.floor(Math.random() * 6) + 1 : finalVal;
  const isLanded = !isRolling && p.altitude < 0.1;
  const scale = 1 + p.altitude / 300;
  const s = 44 * scale;
  const d = isLanded ? 0 : 14 * scale;
  const rad = isLanded
    ? Math.round(p.angle / (Math.PI / 2)) * (Math.PI / 2)
    : p.angle;
  const uTop = { x: Math.cos(rad) * s, y: Math.sin(rad) * s };
  const vTop = {
    x: Math.cos(rad + Math.PI / 2) * s,
    y: Math.sin(rad + Math.PI / 2) * s,
  };
  const depthVec = { x: d * 0.6, y: d * 0.8 };
  const origin = {
    x: p.x - (uTop.x + vTop.x) * 0.5,
    y: p.y - (uTop.y + vTop.y) * 0.5,
  };

  ctx.save();

  if (isLanded) {
    ctx.shadowColor = "rgba(0,0,0,0.2)";
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 2;
  } else {
    ctx.translate(p.altitude / 8, 10 + p.altitude / 3);
    ctx.filter = `blur(${Math.min(4, p.altitude / 40)}px)`;
    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.beginPath();
    const p1 = { x: origin.x + uTop.x, y: origin.y + uTop.y };
    const p3 = { x: origin.x + vTop.x, y: origin.y + vTop.y };
    ctx.moveTo(origin.x, origin.y);
    ctx.lineTo(p1.x, p1.y);
    ctx.lineTo(p1.x + depthVec.x, p1.y + depthVec.y);
    ctx.lineTo(p3.x + uTop.x + depthVec.x, p3.y + uTop.y + depthVec.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.fill();
  }
  ctx.restore();

  if (!isLanded) {
    drawFace(
      ctx,
      (tVal % 6) + 1,
      {
        x: origin.x + uTop.x,
        y: origin.y + uTop.y,
      },
      depthVec,
      vTop,
      "#cbd5e1",
      "#475569",
    );
    drawFace(
      ctx,
      ((tVal + 1) % 6) + 1,
      {
        x: origin.x + vTop.x,
        y: origin.y + vTop.y,
      },
      uTop,
      depthVec,
      "#94a3b8",
      "#334155",
    );
  }
  drawFace(ctx, tVal, origin, uTop, vTop, "#ffffff", "#1e293b");
};

export const drawPoints = (ctx: CanvasRenderingContext2D) => {
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
    const fillColor = isDark ? "#872727" : "#F2AC66";
    const strokeColor = "#E99950"; // Same for both in your SVG logic

    ctx.save();

    // 2. Drop Shadow (Universal for both types)
    ctx.shadowColor = "rgba(0, 0, 0, 0.25)";
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

// --- 1. MIDDLE BAR (Hit Checkers) ---
export const drawBarCheckers = (
  count: number,
  playerColor: number,
  ctx: CanvasRenderingContext2D,
) => {
  if (!count || count === 0) return;
  const absCount = Math.abs(count);

  // Exact Middle of the board
  const x = SIDEBAR_WIDTH + QUADRANT_WIDTH + BAR_WIDTH / 2;

  for (let j = 0; j < absCount; j++) {
    // Player 1 (White) sits on top half or bottom half depending on rules
    // Let's put Player 1 (White) on the Top half of the bar
    // Player 2 (Black) on Bottom half
    const y =
      playerColor === 1
        ? HEIGHT / 2 - 40 - j * 15 // Upwards from center
        : HEIGHT / 2 + 40 + j * 15; // Downwards from center

    ctx.beginPath();
    ctx.arc(x, y, CHECKER_R, 0, Math.PI * 2);
    ctx.fillStyle = playerColor === 1 ? "#e0e0e0" : "#2a150b"; // Use your colors
    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.shadowBlur = 4;
    ctx.fill();
    ctx.strokeStyle = "#111";
    ctx.lineWidth = 1;
    ctx.stroke();
  }
};

// --- 2. RIGHT SIDEBAR (Bearing Off Holes) ---
export const drawOffCheckers = (
  count: number,
  playerColor: number,
  ctx: CanvasRenderingContext2D,
) => {
  // Right Sidebar Center
  const x = WIDTH - SIDEBAR_WIDTH / 2;

  // Determine Y position for the "Hole"
  // Player 1 Top Right, Player 2 Bottom Right (or vice versa based on your move direction)
  // Assuming Player 1 moves > 23 (Top Right)
  const holeY = playerColor === 1 ? HEIGHT * 0.25 : HEIGHT * 0.75;

  // 1. Draw the "Hole" background (Dark recess)
  // Only draw the hole once per frame (technically called multiple times if loop isn't careful,
  // but drawing it over itself is fine or handle outside)
  ctx.save();
  ctx.fillStyle = "#2a150b"; // Dark wood/hole color
  ctx.shadowColor = "rgba(255,255,255,0.1)";
  ctx.shadowBlur = 2;
  ctx.shadowOffsetY = 1;
  ctx.beginPath();
  // A vertical rounded rect looking like a tray
  ctx.roundRect(x - 22, holeY - 80, 44, 160, 22);
  ctx.fill();
  ctx.shadowColor = "transparent";
  ctx.strokeStyle = "#1a0d06";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();

  if (!count || count === 0) return;

  // 2. Draw Checkers inside the hole
  // Stack them vertically starting from the "back" of the hole
  // Player 1 (Top) stacks downwards? Player 2 (Bottom) stacks upwards?
  // Let's just stack them neatly centered in the hole or from one end.

  const stackStartY =
    playerColor === 1
      ? holeY - 60 // Start near top of hole
      : holeY + 60; // Start near bottom of hole

  const direction = playerColor === 1 ? 1 : -1;

  for (let i = 0; i < count; i++) {
    // Flattened "Side View" checkers
    const y = stackStartY + i * 12 * direction;

    ctx.beginPath();
    ctx.ellipse(x, y, 18, 6, 0, 0, Math.PI * 2); // Perspective look

    ctx.fillStyle = playerColor === 1 ? "#9B5A3D" : "#190802"; // Your checker colors
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000";
    ctx.stroke();

    // Add a little shine
    ctx.fillStyle = "rgba(255,255,255,0.2)";
    ctx.beginPath();
    ctx.ellipse(x, y - 1, 14, 4, 0, 0, Math.PI * 2);
    ctx.fill();
  }
};
