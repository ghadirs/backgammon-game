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

    // Helper to draw rounded rectangles within the face coordinate system
    const fillRoundedRect = (ctx: CanvasRenderingContext2D, r: number) => {
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

    // Draws a face by transforming the entire coordinate system to match the face's 3D plane
    const drawFace = (
        ctx: CanvasRenderingContext2D,
        val: number,
        origin: Point,
        u: Point,
        v: Point,
        bgColor: string,
        dotColor: string
    ) => {
        ctx.save();
        ctx.transform(u.x, u.y, v.x, v.y, origin.x, origin.y);

        // 1. Soft Corners Face
        ctx.fillStyle = bgColor;
        fillRoundedRect(ctx, 0.15); // 0.15 creates a realistic "rounded die" corner

        // 2. Dots
        ctx.fillStyle = dotColor;
        const r = 0.09, c = 0.5, l = 0.22, h = 0.78;
        const dotsMap: Record<number, number[][]> = {
            1: [[c, c]], 2: [[l, l], [h, h]], 3: [[l, l], [c, c], [h, h]],
            4: [[l, l], [h, l], [l, h], [h, h]],
            5: [[l, l], [h, l], [c, c], [l, h], [h, h]],
            6: [[l, l], [h, l], [l, c], [h, c], [l, h], [h, h]],
        };

        ctx.beginPath();
        dotsMap[val]?.forEach(([dx, dy]) => {
            ctx.moveTo(dx + r, dy);
            ctx.arc(dx, dy, r, 0, Math.PI * 2);
        });
        ctx.fill();
        ctx.restore();
    };
    const drawSolidCube = (ctx: CanvasRenderingContext2D, p: DiePhysics, finalVal: number) => {
        const tVal = isRolling ? Math.floor(Math.random() * 6) + 1 : finalVal;
        const isLanded = !isRolling && p.altitude < 0.1;

        const scale = 1 + (p.altitude / 300);
        const s = 44 * scale;
        const d = isLanded ? 0 : 14 * scale;
        const rad = isLanded ? Math.round(p.angle / (Math.PI / 2)) * (Math.PI / 2) : p.angle;

        const uTop = { x: Math.cos(rad) * s, y: Math.sin(rad) * s };
        const vTop = { x: Math.cos(rad + Math.PI/2) * s, y: Math.sin(rad + Math.PI/2) * s };
        const depthVec = { x: d * 0.6, y: d * 0.8 };

        const origin = {
            x: p.x - (uTop.x + vTop.x) * 0.5,
            y: p.y - (uTop.y + vTop.y) * 0.5
        };

        // --- SHADOW LOGIC (SHARPENED) ---
        ctx.save();
        if (isLanded) {
            // Tight, clear contact shadow
            ctx.shadowColor = 'rgba(0,0,0,0.2)';
            ctx.shadowBlur = 4; // Reduced from 10 for sharpness
            ctx.shadowOffsetX = 1;
            ctx.shadowOffsetY = 2;
        } else {
            const shX = p.altitude / 8;
            const shY = 10 + p.altitude / 3;
            ctx.translate(shX, shY);

            // CAP THE BLUR:
            // We limit the blur to a max of 4px so it doesn't get "muddy"
            const blurAmount = Math.min(4, p.altitude / 40);
            ctx.filter = `blur(${blurAmount}px)`;

            ctx.fillStyle = 'rgba(0,0,0,0.25)';
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
        ctx.restore(); // CRITICAL: This ensures the blur doesn't bleed into the die faces

        // --- DRAW FACES (STAYS SHARP) ---
        if (!isLanded) {
            const rVal = ((tVal) % 6) + 1;
            const bVal = ((tVal + 1) % 6) + 1;
            drawFace(ctx, rVal, {x: origin.x + uTop.x, y: origin.y + uTop.y}, depthVec, vTop, '#cbd5e1', '#475569');
            drawFace(ctx, bVal, {x: origin.x + vTop.x, y: origin.y + vTop.y}, uTop, depthVec, '#94a3b8', '#334155');
        }

        drawFace(ctx, tVal, origin, uTop, vTop, '#ffffff', '#1e293b');
    };    useEffect(() => { if (isRolling) resetPhysics(); }, [isRolling]);

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