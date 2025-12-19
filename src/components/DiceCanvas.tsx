import React, {useEffect, useRef} from 'react';

interface DiceProps {
    dice: number[];
    isRolling: boolean;
}

const DiceCanvas: React.FC<DiceProps> = ({dice, isRolling}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number>();

    const drawDice = (ctx: CanvasRenderingContext2D, x: number, y: number, value: number, angle: number, scale: number) => {
        const size = 64;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.scale(scale, scale);

        // 1. Shadow
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 15;
        ctx.shadowOffsetY = 10;

        // 2. Body
        ctx.beginPath();
        ctx.roundRect(-size / 2, -size / 2, size, size, 12);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        // 3. Subtle Gradient/Edge
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 2;
        ctx.stroke();

        // 4. Dots
        ctx.fillStyle = '#0f172a';
        const dotR = 5;
        const spacing = 16;
        const dotsMap: Record<number, number[][]> = {
            1: [[0, 0]],
            2: [[-spacing, -spacing], [spacing, spacing]],
            3: [[-spacing, -spacing], [0, 0], [spacing, spacing]],
            4: [[-spacing, -spacing], [spacing, -spacing], [-spacing, spacing], [spacing, spacing]],
            5: [[-spacing, -spacing], [spacing, -spacing], [0, 0], [-spacing, spacing], [spacing, spacing]],
            6: [[-spacing, -spacing], [spacing, -spacing], [-spacing, 0], [spacing, 0], [-spacing, spacing], [spacing, spacing]],
        };

        dotsMap[value]?.forEach(([dx, dy]) => {
            ctx.beginPath();
            ctx.arc(dx, dy, dotR, 0, Math.PI * 2);
            ctx.fill();
        });

        ctx.restore();
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let startTime = Date.now();

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            if (isRolling) {
                // Rolling Animation
                const elapsed = (Date.now() - startTime) * 0.01;
                // Die 1
                drawDice(ctx, centerX - 50, centerY, Math.floor(Math.random() * 6) + 1, elapsed * 5, 1.1 + Math.sin(elapsed) * 0.1);
                // Die 2
                drawDice(ctx, centerX + 50, centerY, Math.floor(Math.random() * 6) + 1, -elapsed * 4, 1.1 + Math.cos(elapsed) * 0.1);
            } else {
                // Static Result
                drawDice(ctx, centerX - 50, centerY, dice[0], 0, 1);
                drawDice(ctx, centerX + 50, centerY, dice[1], 0, 1);
            }
            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current!);
    }, [dice, isRolling]);

    return (
        <canvas
            style={{
                position: 'absolute',
                top: 'calc(50% - 100px)',
                left: 'calc(50% + 200px',
            }}
            ref={canvasRef}
            width={300}
            height={200}
            className="pointer-events-none"
        />
    );
};

export default DiceCanvas;