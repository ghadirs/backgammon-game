import type { Metadata } from "next";
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
        <body style={{ margin: 0, padding: 0, overflowX: 'hidden' }}>
        {children}
        </body>
        </html>
    );
}