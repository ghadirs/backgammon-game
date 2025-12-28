import "./globals.scss";
import type { Metadata } from "next";
import TopNavbar from "@/components/topNavbar";

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
      <body className='min-h-screen bg-[#1a1a1a] text-white antialiased'>
        <TopNavbar />
        {children}
      </body>
    </html>
  );
}
