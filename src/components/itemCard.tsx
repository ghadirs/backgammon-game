"use client";

import React from 'react';
import {Gem} from 'lucide-react';

interface ItemCardProps {
    amount?: string;
    price?: string;
    imageUrl?: string;
}

export default function ItemCard({
                                     amount = "1,000",
                                     price = "1.19 Ton",
                                     imageUrl = "/path-to-your-coin-image.png" // Replace with your actual asset path
                                 }: ItemCardProps) {
    return (
        <div
            className="group relative flex h-50 w-full flex-col items-center justify-between overflow-hidden rounded-md border border-[#1A3150] bg-[#09152A]/35 backdrop-blur-xs transition-all hover:bg-[#09152A]/50 hover:shadow-lg hover:border-[#2A4A75] cursor-pointer">

            {/* 1. Top Hanging Tab (Amount) */}
            <div
                className="absolute top-0 z-10 flex h-6 w-[80px] items-center justify-center rounded-b-2xl border-b border-x border-[#1A3150] bg-[#09152A]/60 backdrop-blur-xs">
        <span className="text-[11px] font-semibold text-white tracking-wide">
          {amount}
        </span>
            </div>

            {/* 2. Central Image Area */}
            <div className="flex h-full w-full flex-col items-center justify-center pt-8 pb-2">
                {/* Glow Effect behind the image */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-20 w-20 rounded-full bg-yellow-500/10 blur-xs"/>

                {/* Coin Stack Image Placeholder */}
                {/* If you don't have the image yet, this div acts as a placeholder */}
                <div className="relative z-0 h-24 w-24 transition-transform duration-300 group-hover:scale-110">
                    {/* Replace this img tag with your real 'Point tape.png' */}
                    <img
                        src="images/wallet/diamond-chest.png"
                        alt="Coins"
                        className="h-full w-full object-contain drop-shadow-lg"
                    />
                </div>
            </div>

            {/* 3. Bottom Price Section */}
            <div className="relative w-full border-t border-[#1A3150] bg-[#09152A]/20 py-3">
                <div className="flex items-center justify-center gap-2">
                    {/* TON Icon */}
                    <div
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0098EA] shadow-[0_0_10px_rgba(0,152,234,0.4)]">
                        <Gem size={12} className="text-white fill-white translate-y-[1px]"/>
                    </div>

                    {/* Price Text */}
                    <span className="text-lg font-medium text-white">
            {price}
          </span>
                </div>
            </div>

        </div>
    );
}