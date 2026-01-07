"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import Image from "next/image"

import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

// PlayerAvatar component
const HEX_CLIP =
  "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"

interface PlayerAvatarProps {
  name: string
  balance: string
  flag: string // e.g., "🇮🇹"
  image: any
  color: string
  align?: "left" | "right"
}

const PlayerAvatar = ({
  name,
  balance,
  flag,
  image,
  color,
  align = "left",
}: PlayerAvatarProps) => {
  return (
    <div
      className={`flex flex-col gap-3 ${align === "right" ? "items-end" : "items-center"}`}
    >
      {/* Outer Hexagon (Stroke) */}
      <div
        style={{ clipPath: HEX_CLIP }}
        className={`size-12 flex items-center justify-center ${
          color === "red" ? "bg-[#e53e3e]" : "bg-[#3182ce]"
        }`}
      >
        {/* Inner Hexagon (Hole/Background) */}
        <div
          style={{ clipPath: HEX_CLIP }}
          className="w-[calc(100%-4px)] h-[calc(100%-4px)] bg-black flex items-center justify-center"
        >
          <Image
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            width={56}
            height={56}
            style={{
              clipPath: HEX_CLIP,
            }}
          />
        </div>
      </div>

      {/* Meta Info */}
      <div className="flex flex-col gap-[2px]">
        {/* Name Row - Reverses order if align is 'right' */}
        <div
          className={`flex items-center gap-[6px] text-white text-xs font-medium ${
            align === "right" ? "flex-row-reverse" : "flex-row"
          }`}
        >
          <span>{flag}</span>
          <span className="leading-none">{name}</span>
        </div>

        {/* Balance Row */}
        <div className="flex items-center justify-center gap-1 text-[#4da3ff] text-xs font-bold">
          <span className="text-[10px]">💎</span>
          <span className="leading-none">{balance}</span>
        </div>
      </div>
    </div>
  )
}

export { Avatar, AvatarImage, AvatarFallback, PlayerAvatar }
