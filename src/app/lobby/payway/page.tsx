"use client";

import React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import pointsImg from "@/assets/icons/POINTS.png";
import tonImg from "@/assets/icons/TON.png";

const payWays = [
  {
    label: "Play with Points",
    img: pointsImg,
    key: "points"
  },
  {
    label: "Play with Ton",
    img: tonImg,
    key: "ton"
  }
];

function PaywayPage() {
  return (
    <main className="flex-1 w-full px-6 flex flex-col items-center justify-center mt-2">
      <section className="flex flex-row gap-6 items-center justify-center w-full max-w-3xl">
        {payWays.map((way, idx) => (
          <article
            key={way.key}
            className="flex flex-col items-center rounded-[20px] shadow-lg max-w-[260px] w-full min-w-[189px] max-h-[270px] mb-4 group bg-[#09152A]/35 border border-[#1A3150] backdrop-blur-sm"
            tabIndex={0}
            aria-label={way.label}
            role="button"
          >
            {/* --- Top: Icon --- */}
            <div
              className="flex items-center justify-center w-full h-[120px] rounded-t-[20px] bg-[#09152A]/10"
            >
              <Image
                src={way.img}
                alt={way.label}
                width={80}
                height={80}
                className="object-contain drop-shadow-lg"
                priority={idx === 0}
              />
            </div>
            {/* --- Bottom: Label + Chevron --- */}
            <div className="flex items-center justify-between w-full px-2 pb-2 pt-2 h-[70px] bg-[#173152] rounded-b-[20px] mt-auto gap-2">
              <span className="text-white text-[22px] leading-[30px] font-sans tracking-wide drop-shadow-sm" style={{fontFamily: "'Strait', sans-serif"}}>
                {way.label}
              </span>
              <button
                type="button"
                tabIndex={-1}
                className="flex items-center justify-center w-[40px] h-[40px] rounded-[16px] bg-[#22395a] hover:bg-[#325076] active:bg-[#18273e] transition-colors duration-150 outline-none border-none ml-auto shadow-none"
                style={{
                  boxShadow: "0 0 0 0 rgba(0,0,0,0)"
                }}
                aria-label="Continue"
              >
                <ChevronRight size={32} className="text-white" strokeWidth={2.5} />
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default PaywayPage;

