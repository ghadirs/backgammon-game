"use client";

export function Header() {
    return (
        <header className="w-full h-[60px] flex items-center justify-between px-6 relative z-50">
            {/* Left Section: User Profile */}
            <div className="flex items-center gap-3">
                <div className="relative w-10 h-10">
                    <img src="/lobby/Polygon-1.png" alt="Profile" className="w-full h-full object-contain"/>
                </div>
                <div className="flex flex-col">
                    <span className="text-white font-['Strong'] text-sm leading-none">Taylor Swift</span>
                    <span className="text-[#F8A04A] text-[10px] font-bold">GET PRO</span>
                </div>
            </div>

            {/* Right Section: Currency & Stats */}
            <div className="flex items-center gap-4">
                {/* Diamonds */}
                <div
                    className="flex items-center bg-[#09152a]/40 border border-[#1a3150] rounded-[10px] px-3 py-1 gap-2">
                    <img src="/lobby/Diamond-1.png" className="w-4 h-4" alt="Diamonds"/>
                    <span className="text-white font-['Strong'] text-sm">32.67</span>
                </div>

                {/* Energy/Balance */}
                <div
                    className="flex items-center bg-[#09152a]/40 border border-[#1a3150] rounded-[10px] px-3 py-1 gap-2">
                    <img src="/lobby/Energy.png" className="w-4 h-4" alt="Energy"/>
                    <span className="text-white font-['Strong'] text-sm">1,000,000,000</span>
                </div>
            </div>
        </header>
    );
}