import './globals.css'; // <--- MUST BE HERE

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body
            className="min-h-screen bg-[#1a1a1a] text-white antialiased"
            suppressHydrationWarning
        >
        {children}
        </body>
        </html>
    );
}