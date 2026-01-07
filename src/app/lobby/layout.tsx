import LobbyTopNavbar from "@/components/LobbyTopNavbar";
import BottomNavbar from "@/components/bottomNavbar.tsx";

export default function LobbyLayout({children}: { children: React.ReactNode }) {
    return (
        <>
            <LobbyTopNavbar/>
            {children}
            <BottomNavbar/>
        </>
    )
}