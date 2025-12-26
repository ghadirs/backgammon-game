"use client";

export function Background() {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Main Background Image - Now 0 degrees */}
            <div className="absolute inset-0">
                <img
                    alt="Background"
                    className="w-full h-full object-cover opacity-40"
                    src="/screenshot.png"
                />
            </div>

            {/* Cyan Blur (Bottom Right) */}
            <div
                className="absolute bottom-[-10%] right-[10%] w-[400px] h-[150px] bg-[#22c8f2] blur-[80px] rounded-full opacity-40"/>

            {/* Red Blur (Top Left) */}
            <div
                className="absolute top-[-10%] left-[-5%] w-[400px] h-[150px] bg-[#ff4f52] blur-[80px] rounded-full opacity-40"/>

            {/* Glassmorphism Border/Shadow Effect */}
            <div className="absolute inset-0 border border-white/5 shadow-[inset_0_0_40px_rgba(34,200,242,0.1)]"/>
        </div>
    );
}