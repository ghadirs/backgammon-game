"use client"
import {useState} from 'react';
import {Lobby} from '@/components/Lobby';
import {Friends} from '@/components/Friends';
import {Wallet} from '@/components/Wallet';
import {Navigation} from '@/components/Navigation';
import {Background} from '@/components/Background';
import {Header} from '@/components/Header';
import '@/styles/index.css'

type Screen = 'lobby' | 'friends' | 'wallet';

export default function Layout() {
    const [currentScreen, setCurrentScreen] = useState<Screen>('lobby');

    return (
        <html lang="en">
        <body>

        <div className="relative h-screen w-screen overflow-hidden"
             style={{backgroundImage: "linear-gradient(-90deg, rgb(9, 19, 42) 0%, rgb(103, 198, 251) 224.23%)"}}>
            <Background/>

            {/* Main Container */}
            <div className="relative size-full flex items-center justify-center">
                <div className="relative w-[844px] h-full">
                    {/* Header */}
                    <Header/>

                    {/* Content */}
                    {currentScreen === 'lobby' && <Lobby/>}
                    {currentScreen === 'friends' && <Friends/>}
                    {currentScreen === 'wallet' && <Wallet/>}

                    {/* Navigation */}
                    <Navigation currentScreen={currentScreen} onScreenChange={setCurrentScreen}/>
                </div>
            </div>
        </div>
        </body>
        </html>

    );
}