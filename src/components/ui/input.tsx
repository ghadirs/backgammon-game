"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  onSubmit?: () => void;
  isLoading?: boolean;
  buttonLabel?: string;
  icon?: React.ReactNode;
  inputClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      onSubmit,
      isLoading = false,
      buttonLabel,
      icon,
      inputClassName,
      ...props
    },
    ref
  ) => {
    // If buttonLabel is provided, render the complex input with button
    if (buttonLabel !== undefined && buttonLabel !== "") {
      return (
        <div
          className={cn(
            "group relative flex w-full max-w-[516px] h-12 items-center rounded-xl border border-[#1A3150] bg-[#09152A]/35 backdrop-blur-md transition-all hover:border-[#2a4a75]",
            className
          )}
        >
          {/* Input Field (Left Side) */}
          <input
            type={type}
            ref={ref}
            className={cn(
              "h-full flex-grow bg-transparent px-5 text-sm font-medium text-white placeholder-white/50 outline-none transition-colors",
              inputClassName
            )}
            {...props}
          />

          {/* Action Button (Right Side) */}
          <>
            {/* Separator Line (Visual Divider) */}
            <div className='h-full w-[1px] bg-[#1A3150]' />
            <button
              onClick={onSubmit}
              disabled={isLoading}
              className='relative flex h-full min-w-[126px] items-center justify-center gap-2 rounded-r-xl bg-[#09152A]/20 px-4 transition-all hover:bg-[#1A3150]/80 active:bg-[#09152A] disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {icon}
              {/* Button Text */}
              <span className='text-sm font-medium text-white'>
                {isLoading ? "Sending..." : buttonLabel}
              </span>
            </button>
          </>
        </div>
      );
    }

    // Simple input (shadcn-style) when no buttonLabel
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
