import React from "react";

interface ButtonProps {
  icon?: React.ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  ariaLabel?: string;
}

const ButtonComponent = ({
  icon,
  label,
  onClick,
  className = "",
  disabled = false,
  variant = "primary",
  size = "md",
  ariaLabel,
}: ButtonProps) => {
  const baseStyles =
    "flex items-center justify-start gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary:
      "bg-button border border-dark-secondary backdrop-blur-[40px] text-white hover:bg-dark-secondary/60 hover:border-dark-secondary focus:ring-gold-primary",
    secondary:
      "bg-transparent border border-white/10 text-gray-300 hover:bg-white/5 hover:text-white focus:ring-gold-primary",
  };

  const sizeStyles = {
    sm: "min-w-[120px] h-8 text-xs",
    md: "min-w-[140px] h-9 text-sm",
    lg: "min-w-[160px] h-10 text-base",
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  return (
    <button
      className={combinedClassName}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || label}
      type="button"
    >
      {icon && <span className="flex items-center justify-center opacity-90">{icon}</span>}
      <span className="tracking-wide">{label}</span>
    </button>
  );
};

export default ButtonComponent;
