"use client";
import React from "react";
import { CoinsIcon, CrownIcon, GemIcon, Settings, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import avatarImg from "@/assets/avatars/taylor-swift.jpg";

const ProfileTopNavbar = () => (
  <header className='relative w-full h-[60px] flex items-start justify-between px-6 pt-5 z-20'>
    <div className='flex items-center gap-4'>
      <div className='bg-[#0b172a]/80 border border-[#1A3150] rounded-lg px-3 py-1 flex items-center gap-2 h-[32px]'>
        <div className='w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(6,182,212,0.6)]'>
          <GemIcon className='fas fa-gem text-[10px] text-white' />
        </div>
        <span className='text-white text-sm font-light'>32.67</span>
      </div>

      <div className='bg-[#0b172a]/80 border border-[#1A3150] rounded-lg px-3 py-1 flex items-center gap-2 h-[32px]'>
        <div className='w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(245,158,11,0.6)]'>
          <CrownIcon className='fas fa-crown text-[10px] text-white'></CrownIcon>
        </div>
        <span className='text-white text-sm font-light tracking-wide'>
          1,000,000,000
        </span>
      </div>

      <div className='bg-[#0b172a]/80 border border-[#1A3150] rounded-lg px-3 py-1 flex items-center justify-center h-[32px] cursor-pointer hover:bg-[#0b172a] transition-colors'>
        <Settings className='w-4 h-4 text-white' />
      </div>
    </div>
    <div className='absolute top-0 left-1/2 -translate-x-1/2 bg-[#12233f] px-8 py-2 rounded-b-[24px] border-b border-x border-[#1A3150] shadow-lg flex items-center gap-3 h-[50px]'>
      <div className='relative'>
        <Image
          src={avatarImg}
          alt='Profile'
          className='w-8 h-8 rounded-full border border-pink-400 object-cover'
        />
      </div>
      <span className='text-white font-light text-sm tracking-wide'>
        Taylor Swift
      </span>
    </div>
    <div className='flex items-center gap-4'>
      <Link
        href='/lobby'
        className='flex h-9 w-9 items-center justify-center rounded-lg border border-red-900/50 bg-[#FF2428] text-white shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer'
      >
        <X size={20} strokeWidth={3} />
      </Link>
    </div>
  </header>
);
export default ProfileTopNavbar;
