import type {Metadata} from "next";
import "./globals.scss"; // Ensure this file exists for global styles

export const metadata: Metadata = {
    title: "Royal Backgammon",
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
        <body className="min-h-screen bg-[#1a1a1a] text-white antialiased">
        {children}
        </body>
        </html>
    );
}