import TopNavbar from "@/components/topNavbar.tsx";
import BottomNavbar from "@/components/bottomNavbar.tsx";

export default function LobbyLayout({children}: { children: React.ReactNode }) {
    return (
        <>
            <TopNavbar/>
            {children}
            <BottomNavbar/>
        </>
    )
}