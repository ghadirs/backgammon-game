import React, { useEffect, useRef } from 'react';

interface DiceProps {
    dice: number[];
    isRolling: boolean;
}

interface Point { x: number; y: number; }

interface DiePhysics {
    x: number; y: number;
    vx: number; vy: number;
    angle: number; vAngle: number;
    altitude: number; vAltitude: number;
}

const DiceCanvas: React.FC<DiceProps> = ({ dice, isRolling }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number>();

    // Physics State
    const physics = useRef<DiePhysics[]>([
        { x: 100, y: 150, vx: 0, vy: 0, angle: 0, vAngle: 0, altitude: 0, vAltitude: 0 },
        { x: 200, y: 150, vx: 0, vy: 0, angle: 0, vAngle: 0, altitude: 0, vAltitude: 0 }
    ]);

    const resetPhysics = () => {
        physics.current.forEach((p, i) => {
            p.x = 60 + (i * 80);
            p.y = 120 + Math.random() * 60;
            p.vx = 8 + Math.random() * 8;
            p.vy = (Math.random() - 0.5) * 10;
            p.vAngle = 0.25 + Math.random() * 0.35; // Fast spin
            p.altitude = 160;
            p.vAltitude = 5;
        });
    };

    // --- GEOMETRY HELPERS ---

    const rotatePoint = (px: number, py: number, cx: number, cy: number, angle: number): Point => {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const dx = px - cx;
        const dy = py - cy;
        return {
            x: cx + (dx * cos - dy * sin),
            y: cy + (dx * sin + dy * cos)
        };
    };

    // Draws a face by transforming the entire coordinate system to match the face's 3D plane
    const drawFace = (
        ctx: CanvasRenderingContext2D,
        val: number,
        origin: Point,
        u: Point, // Vector along the "width" of the face
        v: Point, // Vector along the "height" of the face
        bgColor: string,
        dotColor: string
    ) => {
        ctx.save();

        // 1. Apply Affine Transformation
        // This maps the unit square (0,0) -> (1,1) to our custom parallelogram
        ctx.transform(u.x, u.y, v.x, v.y, origin.x, origin.y);

        // 2. Draw Face Background
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, 1, 1); // We draw a simple 1x1 square, the transform stretches it

        // 3. Draw Dots
        // Because of the transform, drawing a perfect circle here results in a
        // perspectively correct ellipse on the screen!
        ctx.fillStyle = dotColor;
        const r = 0.09; // Dot radius (relative to face size 1.0)

        // Dot positions on a 0 to 1 grid
        const c = 0.5;
        const l = 0.22;
        const h = 0.78;

        const dotsMap: Record<number, number[][]> = {
            1: [[c, c]],
            2: [[l, l], [h, h]],
            3: [[l, l], [c, c], [h, h]],
            4: [[l, l], [h, l], [l, h], [h, h]],
            5: [[l, l], [h, l], [c, c], [l, h], [h, h]],
            6: [[l, l], [h, l], [l, c], [h, c], [l, h], [h, h]],
        };

        ctx.beginPath();
        dotsMap[val]?.forEach(([dx, dy]) => {
            // Draw circle. The context skew makes it look 3D.
            ctx.moveTo(dx + r, dy); // optimization to avoid connecting lines
            ctx.arc(dx, dy, r, 0, Math.PI * 2);
        });
        ctx.fill();

        // Optional: Bevel Edge inside the face
        ctx.strokeStyle = 'rgba(255,255,255,0.15)';
        ctx.lineWidth = 0.02;
        ctx.strokeRect(0, 0, 1, 1);

        ctx.restore();
    };

    const drawSolidCube = (ctx: CanvasRenderingContext2D, p: DiePhysics, finalVal: number) => {
        // Chaos rolling values
        const tVal = isRolling ? Math.floor(Math.random() * 6) + 1 : finalVal;
        const rVal = isRolling ? Math.floor(Math.random() * 6) + 1 : (finalVal % 6) + 1;
        const bVal = isRolling ? Math.floor(Math.random() * 6) + 1 : ((finalVal + 1) % 6) + 1;

        const scale = 1 + (p.altitude / 300);
        const s = 44 * scale; // Cube side length
        const d = 14 * scale; // Cube depth (thickness)

        // 1. Calculate Top Face Vectors (Rotation)
        const rad = p.angle;
        // uTop = Vector along top edge
        const uTop = { x: Math.cos(rad) * s, y: Math.sin(rad) * s };
        // vTop = Vector along left edge (perpendicular)
        const vTop = { x: Math.cos(rad + Math.PI/2) * s, y: Math.sin(rad + Math.PI/2) * s };

        // 2. Depth Vector (fixed perspective)
        const depthVec = { x: d * 0.6, y: d * 0.8 };

        // 3. Origin Point (Top-Left corner of the top face)
        // We calculate this relative to center (p.x, p.y)
        const origin = {
            x: p.x - (uTop.x + vTop.x) * 0.5,
            y: p.y - (uTop.y + vTop.y) * 0.5
        };

        // Vertices for Shadow Calculation
        const p0 = origin;
        const p1 = { x: origin.x + uTop.x, y: origin.y + uTop.y }; // Top Right
        const p2 = { x: p1.x + vTop.x, y: p1.y + vTop.y }; // Bottom Right
        const p3 = { x: origin.x + vTop.x, y: origin.y + vTop.y }; // Bottom Left

        // --- SHADOW (Real Blur) ---
        ctx.save();
        // Shift shadow based on altitude
        const shX = p.altitude / 6;
        const shY = 15 + p.altitude / 2.5;

        ctx.translate(shX, shY);
        // Apply Gaussian Blur
        // Note: 'filter' works in most modern browsers. Fallback logic isn't included here for brevity.
        ctx.filter = `blur(${8 + p.altitude / 10}px)`;
        ctx.fillStyle = 'rgba(0,0,0,0.4)';

        // Draw Hull of the cube for shadow
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.lineTo(p1.x + depthVec.x, p1.y + depthVec.y);
        ctx.lineTo(p2.x + depthVec.x, p2.y + depthVec.y);
        ctx.lineTo(p3.x + depthVec.x, p3.y + depthVec.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        // --- DRAW FACES ---
        // We draw Back-to-Front painter's algorithm order is tricky with rotation,
        // but for this specific perspective (Top-Right-Bottom visible), this order works:

        // 1. Right Face (Connects to the "Right" edge of top face: p1 -> p2)
        // Origin: p1. Width Vector: depthVec. Height Vector: vTop.
        drawFace(ctx, rVal, p1, depthVec, vTop, '#cbd5e1', '#475569');

        // 2. Bottom/Front Face (Connects to "Bottom" edge of top face: p3 -> p2)
        // Origin: p3. Width Vector: uTop. Height Vector: depthVec.
        drawFace(ctx, bVal, p3, uTop, depthVec, '#94a3b8', '#334155');

        // 3. Top Face (The main one)
        drawFace(ctx, tVal, origin, uTop, vTop, '#ffffff', '#1e293b');

        // Highlight Stroke for Top Face
        ctx.save();
        ctx.transform(uTop.x, uTop.y, vTop.x, vTop.y, origin.x, origin.y);
        ctx.strokeStyle = '#f8fafc';
        ctx.lineWidth = 0.04;
        ctx.strokeRect(0,0,1,1);
        ctx.restore();
    };

    useEffect(() => { if (isRolling) resetPhysics(); }, [isRolling]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // COLLISION LOGIC
            const p1 = physics.current[0];
            const p2 = physics.current[1];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx*dx + dy*dy);

            if (dist < 60) {
                const angle = Math.atan2(dy, dx);
                const push = (60 - dist) / 2;
                p1.x += Math.cos(angle) * push; p1.y += Math.sin(angle) * push;
                p2.x -= Math.cos(angle) * push; p2.y -= Math.sin(angle) * push;
                p1.vx *= -0.5; p2.vx *= -0.5;
            }

            physics.current.forEach((p, i) => {
                if (isRolling || p.altitude > 0 || Math.abs(p.vx) > 0.1) {
                    p.vAltitude -= 0.6;
                    p.altitude += p.vAltitude;

                    if (p.altitude < 0) {
                        p.altitude = 0;
                        p.vAltitude *= -0.4;
                        p.vx *= 0.72; p.vy *= 0.72;
                        p.vAngle = (Math.random() - 0.5) * 0.4;
                    }
                    p.x += p.vx; p.y += p.vy;
                    if (p.x < 40 || p.x > canvas.width - 40) p.vx *= -0.8;
                    if (p.y < 40 || p.y > canvas.height - 40) p.vy *= -0.8;
                    p.angle += p.vAngle;
                }
                drawSolidCube(ctx, p, dice[i]);
            });
            requestRef.current = requestAnimationFrame(animate);
        };
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current!);
    }, [dice, isRolling]);

    return (
        <canvas ref={canvasRef} width={450} height={700}
                style={{ position: 'absolute', top: '50%', left: 'calc(25% + 30px)', transform: 'translate(-50%, -50%)', pointerEvents: 'none', zIndex: 100 }}
        />
    );
};

export default DiceCanvas;