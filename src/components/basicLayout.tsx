import React from "react";

interface IProps {
  className?: string;
  children: React.ReactNode;
}

const BasicLayoutComponent: React.FC<IProps> = ({ children, className = "" }) => {
  return (
    <main
      className={`relative h-screen w-screen bg-cover bg-center bg-no-repeat flex justify-center items-center overflow-hidden text-white ${className}`}
      style={{
        backgroundImage: "url('/background.png')",
      }}
    >
      {/* Subtle darkening overlay */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Content */}
      <div className="relative z-10 w-full h-full">{children}</div>
    </main>
  );
};

export default BasicLayoutComponent;
