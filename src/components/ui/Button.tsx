import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    fullWidth?: boolean;
    children: React.ReactNode;
}

const ButtonComponent: React.FC<ButtonProps> = ({
                                                    variant = 'primary',
                                                    fullWidth = false,
                                                    children,
                                                    className = '',
                                                    ...props
                                                }) => {
    const baseStyles = "px-6 py-3 rounded-xl font-bold transition-all duration-200 transform active:scale-95";

    const variants = {
        primary: "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]",
        secondary: "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700",
        danger: "bg-red-600 hover:bg-red-500 text-white",
        ghost: "bg-transparent hover:bg-white/10 text-white"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default ButtonComponent;