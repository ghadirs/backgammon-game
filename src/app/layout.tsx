import type { Metadata } from "next";
import "./globals.css";
import BottomNavbar from "@/components/bottomNavbar.tsx";
import { DialogProvider } from "@/components/modals/DialogProvider";

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
    <html lang='en'>
      {/* h-screen ensures the body takes up the full browser height */}
      <body className="h-screen w-screen flex items-center justify-center bg-[url('public/background.png')] bg-cover bg-center overflow-hidden">
        <DialogProvider />
        <div className='glass-panel relative w-screen h-screen flex flex-col justify-start overflow-hidden shadow-2xl'>
          {children}
        </div>
      </body>
    </html>
  );
}
