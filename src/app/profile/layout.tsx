"use client";

import ProfileTopNavbar from "@/components/ProfileTopNavbar";
import BottomNavbar from "@/components/bottomNavbar.tsx";

export default function ProfileLayout({children}: { children: React.ReactNode }) {
    return (
        <>
            <ProfileTopNavbar/>
            {children}
            <BottomNavbar/>
        </>
    )
}