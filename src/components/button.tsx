import React from "react";

interface ButtonProps {
  icon?: React.ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export default function Button({
  icon,
  label,
  onClick,
  className,
  children,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={
        className
          ? className
          : `group flex h-12 min-w-[160px] items-center justify-center gap-3 rounded-xl border border-[#1A3150] bg-[#09152A]/60 px-8 transition-all hover:bg-[#1A3150] hover:shadow-lg active:scale-95 cursor-pointer`
      }
    >
      {!children ? (
        <>
          {icon}
          <span className="text-sm font-medium uppercase tracking-wide text-white">
            {label}
          </span>{" "}
        </>
      ) : (
        children
      )}
    </button>
  );
}
