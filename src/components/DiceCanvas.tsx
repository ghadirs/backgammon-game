import React, {useEffect, useRef} from 'react';

interface DiceProps {
    dice: number[];
    isRolling: boolean;
}

// Helper to keep track of each die's physics state
interface DieState {
    x: number;
    y: number;
    angle: number;
    scale: number;
    targetX: number;
    targetY: number;
    targetAngle: number;
}

const DiceCanvas: React.FC<DiceProps> = ({dice, isRolling}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number>();

    // Store the state of both dice so they persist between frames
    const diceState = useRef<DieState[]>([
        {x: 100, y: 100, angle: 0, scale: 0, targetX: 100, targetY: 100, targetAngle: 0},
        {x: 200, y: 100, angle: 0, scale: 0, targetX: 200, targetY: 100, targetAngle: 0}
    ]);

    // Recalculate landing spots whenever the dice numbers change
    useEffect(() => {
        if (isRolling) return;

        // Canvas dimensions are 300x200 (from your props)
        const centerX = 150;
        const centerY = 100;
        const spread = 40; // How far they can land from center

        // Randomize landing positions near the center, but keep them somewhat separated
        // Die 1 lands slightly to the left, Die 2 slightly to the right
        diceState.current[0].targetX = centerX - spread + (Math.random() * 40 - 20);
        diceState.current[0].targetY = centerY + (Math.random() * 40 - 20);
        diceState.current[0].targetAngle = (Math.random() * 0.5) - 0.25; // Slight random tilt

        diceState.current[1].targetX = centerX + spread + (Math.random() * 40 - 20);
        diceState.current[1].targetY = centerY + (Math.random() * 40 - 20);
        diceState.current[1].targetAngle = (Math.random() * 0.5) - 0.25;

    }, [dice, isRolling]);


    const drawDice = (ctx: CanvasRenderingContext2D, x: number, y: number, value: number, angle: number, scale: number) => {
        const size = 64;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.scale(scale, scale);

        // 1. Shadow (Dynamic based on scale to simulate height)
        ctx.shadowColor = 'rgba(0,0,0,0.4)';
        ctx.shadowBlur = 15 * scale;
        ctx.shadowOffsetY = 10 * scale;

        // 2. Body
        ctx.beginPath();
        ctx.roundRect(-size / 2, -size / 2, size, size, 12);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        // 3. Edge
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
            const elapsed = (Date.now() - startTime) * 0.001;

            // Loop through both dice to update physics and draw
            diceState.current.forEach((die, index) => {

                if (isRolling) {
                    // --- ROLLING STATE (Chaos) ---
                    // Orbit around center with noise
                    const centerX = canvas.width / 2;
                    const centerY = canvas.height / 2;
                    const orbitRadius = 40;
                    const speed = 8;

                    // Add noise to make it look like shaking
                    const noiseX = Math.random() * 10 - 5;
                    const noiseY = Math.random() * 10 - 5;

                    // Offset phase for second die so they don't overlap perfectly
                    const phase = index * Math.PI;

                    die.x = centerX + Math.cos(elapsed * speed + phase) * orbitRadius + noiseX;
                    die.y = centerY + Math.sin(elapsed * speed + phase) * orbitRadius + noiseY;
                    die.angle += 0.2; // Spin fast
                    die.scale = 1.1 + Math.sin(elapsed * 10) * 0.1; // Pulse size

                } else {
                    // --- DROPPING/SETTLING STATE (Smooth Landing) ---
                    // Simple Linear Interpolation (Lerp) towards target
                    // The '0.1' factor determines the speed/weight of the die
                    die.x += (die.targetX - die.x) * 0.1;
                    die.y += (die.targetY - die.y) * 0.1;
                    die.angle += (die.targetAngle - die.angle) * 0.1;
                    die.scale += (1 - die.scale) * 0.1; // Scale back to 1
                }

                // Determine which face to show
                // If rolling, flash random numbers. If done, show actual result.
                const valueToShow = isRolling
                    ? Math.floor(Math.random() * 6) + 1
                    : dice[index];

                drawDice(ctx, die.x, die.y, valueToShow, die.angle, die.scale);
            });

            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current!);
    }, [dice, isRolling]); // Re-run if rolling state changes

    return (
        <div className="diceCanvasWrapper">
            <canvas
                ref={canvasRef}
                width={300}
                height={200}
                style={{
                    // Ensure the canvas itself is centered correctly
                    // You might need to adjust these offsets depending on your parent container
                    display: 'block',
                    position: 'absolute',
                    left: 'calc(50% + 100px)',
                    top: 'calc(50% - 100px)',
                }}
            />
        </div>
    );
};

export default DiceCanvas;