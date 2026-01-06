"use client";
import React from "react";
import { X } from "lucide-react";

interface ModalProps {
  children: React.ReactNode;
  title: string;
  onClose: () => void;
}

export default function Modal({ children, title, onClose }: ModalProps) {
  return (
    // Backdrop Overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      {/* Modal Container */}
      <div className="relative w-full min-h[400px] max-w-[560px] overflow-hidden rounded-2xl border border-[#1A3150] bg-[#09152A]/85 shadow-2xl backdrop-blur-xl ">
        {/* Header Section */}
        <div className="flex items-center justify-end relative border-b border-[#1A3150] px-6 py-5">
          <h2 className="text-2xl font-normal uppercase tracking-wide text-white ml-auto mr-auto">
            {title}
          </h2>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center absolute rounded-lg border border-red-900/50 bg-[#FF2428] text-white shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer "
          >
            <X size={20} strokeWidth={3} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
