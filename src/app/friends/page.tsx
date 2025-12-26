"use client"


export default function Friends() {
    return (
        <>
            {/* Title */}
            <div
                className="absolute bottom-[45.97%] flex items-center justify-center left-[calc(50%+170.5px)] top-[45.97%] translate-x-[-50%]">
                <div className="flex-none h-[29px] rotate-[90deg] w-[68px]">
                    <div
                        className="flex flex-col font-['Strong:Regular',sans-serif] justify-center leading-[0] not-italic relative text-[#f3edf7] text-[24px] text-center text-nowrap">
                        <p className="leading-[normal]">Friends</p>
                    </div>
                </div>
            </div>

            {/* Friends List Container */}
            <div
                className="absolute bottom-[194px] flex h-[457px] items-center justify-center left-[calc(50%+10px)] translate-x-[-50%] w-[226px]"
                style={{"--transform-inner-width": "0", "--transform-inner-height": "0"} as React.CSSProperties}>
                <div className="flex-none rotate-[90deg]">
                    <div
                        className="backdrop-blur-[10px] backdrop-filter bg-[rgba(9,21,42,0.35)] h-[226px] relative rounded-[12px] w-[457px]">
                        <div aria-hidden="true"
                             className="absolute border border-[#1a3150] border-solid inset-[-1px] pointer-events-none rounded-[13px]"/>
                    </div>
                </div>
            </div>

            {/* Friend Items */}
            {[0, 1, 2, 3, 4].map((index) => (
                <FriendItem key={index} index={index}/>
            ))}

            {/* Exit Button */}
            <div className="absolute flex items-center justify-center left-[347px] size-[36px] top-[800px]"
                 style={{"--transform-inner-width": "2", "--transform-inner-height": "2"} as React.CSSProperties}>
                <div className="flex-none rotate-[90deg]">
                    <div
                        className="backdrop-blur-[10px] backdrop-filter bg-[rgba(9,21,42,0.35)] border border-[#1a3150] border-solid rounded-[12px] size-[36px]"/>
                </div>
            </div>

            <div className="absolute flex items-center justify-center left-[355px] size-[20px] top-[808px]"
                 style={{"--transform-inner-width": "0", "--transform-inner-height": "0"} as React.CSSProperties}>
                <div className="flex-none rotate-[90deg]">
                    <div className="relative size-[20px]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                            <g id="close-square">
                                <path
                                    d="M13.9417 2.5H6.05833C3.325 2.5 1.66666 4.16666 1.66666 6.9V13.0917C1.66666 15.8333 3.325 17.5 6.05833 17.5H13.9333C16.6667 17.5 18.325 15.8333 18.325 13.1V6.9C18.3333 4.16666 16.675 2.5 13.9417 2.5ZM12.8167 11.9083C13.075 12.1667 13.075 12.5833 12.8167 12.8417C12.6917 12.9667 12.525 13.025 12.3583 13.025C12.1917 13.025 12.025 12.9667 11.9 12.8417L10 10.9417L8.1 12.8417C7.975 12.9667 7.80833 13.025 7.64166 13.025C7.475 13.025 7.30833 12.9667 7.18333 12.8417C6.925 12.5833 6.925 12.1667 7.18333 11.9083L9.08333 10.0083L7.18333 8.10833C6.925 7.85 6.925 7.43333 7.18333 7.175C7.44166 6.91666 7.85833 6.91666 8.11666 7.175L10.0167 9.075L11.9167 7.175C12.175 6.91666 12.5917 6.91666 12.85 7.175C13.1083 7.43333 13.1083 7.85 12.85 8.10833L10.95 10.0083L12.8167 11.9083Z"
                                    fill="#FF2428"/>
                            </g>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Divider Line */}
            <div className="absolute flex w-[844px] items-center justify-center left-[340px] top-0 w-0"
                 style={{"--transform-inner-width": "0", "--transform-inner-height": "0"} as React.CSSProperties}>
                <div className="flex-none rotate-[270deg]">
                    <div className="h-0 relative w-[844px]">
                        <div className="absolute inset-[-1px_0_0_0]">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 844 1">
                                <line stroke="url(#paint0_linear_3_493)" x2="844" y1="0.5" y2="0.5"/>
                                <defs>
                                    <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_3_493" x1="844"
                                                    x2="0" y1="1.5" y2="1.5">
                                        <stop stopColor="#151F38"/>
                                        <stop offset="0.5" stopColor="#1A3150"/>
                                        <stop offset="1" stopColor="#151F38"/>
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function FriendItem({index}: { index: number }) {
    const leftPosition = 91 + (index * 45.44);
    const topBase = 217;
    const requestGameTop = 554;

    return (
        <div className="absolute contents" style={{left: `${leftPosition}px`, top: `${topBase}px`}}>
            {/* User Avatar */}
            <div className="absolute flex h-[36px] items-center justify-center top-[217px] w-[34.08px]" style={{
                "--transform-inner-width": "0",
                "--transform-inner-height": "0",
                left: `${leftPosition}px`
            } as React.CSSProperties}>
                <div className="flex-none rotate-[90deg]">
                    <div className="h-[34.08px] relative w-[36px]">
                        <div className="absolute inset-[3.28%_6.7%]">
                            <img alt="" className="block max-w-none size-full" height="31.846"
                                 src={"/lobby/Polygon-1.png"}
                                 width="31.177"/>
                        </div>
                    </div>
                </div>
            </div>

            {/* User Name */}
            <div className="absolute flex items-center justify-center top-[259px]" style={{
                "--transform-inner-width": "0",
                "--transform-inner-height": "0",
                left: `${leftPosition + 2.92}px`
            } as React.CSSProperties}>
                <div className="flex-none h-[16.093px] rotate-[90deg] w-[84px]">
                    <div
                        className="flex flex-col font-['Strong:Regular',sans-serif] justify-center leading-[0] not-italic relative size-full text-[#f3edf7] text-[14px]">
                        <p className="leading-[normal]">🇮🇹 Taylor Swift</p>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="absolute flex items-center justify-center top-[291px]" style={{
                "--transform-inner-width": "0",
                "--transform-inner-height": "0",
                left: `${leftPosition + 2.92}px`
            } as React.CSSProperties}>
                <div className="flex-none h-[11.36px] rotate-[90deg] w-[33px]">
                    <div
                        className="flex flex-col font-['Strong:Regular',sans-serif] justify-center leading-[0] not-italic relative size-full text-[#f3edf7] text-[10px]">
                        <p className="leading-[normal]">36361.2</p>
                    </div>
                </div>
            </div>

            <div className="absolute flex items-center justify-center top-[297px]" style={{
                "--transform-inner-width": "0",
                "--transform-inner-height": "0",
                left: `${leftPosition + 2.92}px`
            } as React.CSSProperties}>
                <div className="flex-none h-[11.36px] rotate-[90deg] w-[18px]">
                    <div
                        className="flex flex-col font-['Strong:Regular',sans-serif] justify-center leading-[0] not-italic relative size-full text-[#f3edf7] text-[10px]">
                        <p className="leading-[normal]">2.7B</p>
                    </div>
                </div>
            </div>

            <div className="absolute flex h-[10px] items-center justify-center top-[259px] w-[9.467px]" style={{
                "--transform-inner-width": "0",
                "--transform-inner-height": "0",
                left: `${leftPosition + 3.86}px`
            } as React.CSSProperties}>
                <div className="flex-none rotate-[90deg]">
                    <div className="h-[9.467px] relative w-[10px]">
                        <img alt=""
                             className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full"
                             src={'/lobby/Polygon-1.png'}/>
                    </div>
                </div>
            </div>

            <div className="absolute flex h-[10px] items-center justify-center top-[313.67px] w-[9.467px]" style={{
                "--transform-inner-width": "0",
                "--transform-inner-height": "0",
                left: `${leftPosition + 3.86}px`
            } as React.CSSProperties}>
                <div className="flex-none rotate-[90deg]">
                    <div className="h-[9.467px] relative w-[10px]">
                        <img alt=""
                             className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full"
                             src={'/lobby/Polygon-1.png'}/>
                    </div>
                </div>
            </div>

            {/* Request Game Button */}
            <div className="absolute flex h-[72px] items-center justify-center top-[554px] w-[22.72px]" style={{
                "--transform-inner-width": "2",
                "--transform-inner-height": "2",
                left: `${leftPosition - 8.56}px`
            } as React.CSSProperties}>
                <div className="flex-none rotate-[90deg]">
                    <div
                        className="backdrop-blur-2xl backdrop-filter bg-[rgba(9,21,42,0.5)] border border-[#1a3150] border-solid h-[22.72px] rounded-[6px] w-[72px]"/>
                </div>
            </div>

            <div
                className="absolute flex h-[56px] items-center justify-center top-[590px] translate-y-[-50%] w-[11.36px]"
                style={{
                    "--transform-inner-width": "67.265625",
                    "--transform-inner-height": "11",
                    left: `${leftPosition - 2.88}px`
                } as React.CSSProperties}>
                <div className="flex-none rotate-[90deg]">
                    <div
                        className="flex flex-col font-['Strong:Regular',sans-serif] h-[11.36px] justify-center leading-[0] not-italic relative text-[10px] text-white w-[56px]">
                        <p className="leading-[normal]">Request Game</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
