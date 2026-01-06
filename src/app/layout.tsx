import type { Metadata } from "next";
import "./globals.scss"; // Ensure this file exists for global styles

export const metadata: Metadata = {
  title: "Backgammon Game",
  description: "A Masterpiece of Strategy & Luck",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* h-screen ensures the body takes up the full browser height */}
      <body className="h-screen w-full flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1472851294608-4155f2118c03?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center overflow-hidden">
        <div className="glass-panel relative w-full h-full rounded-[21px] flex flex-col justify-between overflow-hidden shadow-2xl">
          {children}
        </div>
      </body>
    </html>
  );
}
