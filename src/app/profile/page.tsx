"use client";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Avatar, AvatarImage } from "../../components/ui/avatar";
import { Settings, Pen, ArrowLeft, CheckSquare, XSquare } from "lucide-react";
import Image from "next/image";
import taylorSwift from '@/assets/avatars/taylor-swift.jpg'

const USER = {
  name: "Taylor Swift",
  tag: "#e415G",
  avatar: taylorSwift,
  level: 2,
  xp: 20,
  xpMax: 150,
  stats: {
    gamePlayed: 12,
    wins: 12,
    gammon: 12,
    backgammon: 12,
    highestWinstreak: 12,
    tournamentPlayed: 12,
    tournamentWins: 12,
  },
};
const CURRENCY = {
  ton: {
    value: "32.67",
    icon: "/assets/images/wallet/diamond-bag-.png",
    label: "TON",
  },
  gold: {
    value: "1,000,000,000",
    icon: "/assets/images/wallet/diamond-chest.png",
    label: "Gold",
  },
};

export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(USER.name);
  const [showNotification, setShowNotification] = useState(true);

  return (
    <main
      className={
        "min-h-screen w-full flex flex-col items-center justify-start relative overflow-x-hidden "
      }
      style={{ fontFamily: "Strong, system-ui, sans-serif" }}
    >
      {/* Title */}
      <div
        className="absolute z-10"
        style={{
          width: "36px",
          height: "171px",
          left: "calc(50% - 171px / 2)",
          top: "0",
         
        }}
      >
        <div
          className="box-border flex items-center justify-center rounded-md border backdrop-blur-[10px]"
          style={{
            width: "171px",
            height: "36px",
            background: "rgba(9, 21, 42, 0.35)",
            borderColor: "#1A3150",
          }}
        >
          <span
            className="text-[#F3EDF7]"
            style={{
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "17px",
            }}
          >
            Profile
          </span>
        </div>
      </div>

      {/* Notification */}
      {showNotification && (
        <div className="fixed top-6 right-6 flex items-center space-x-2 bg-blue-950/80 border border-blue-900 rounded-lg px-4 py-2 shadow-lg z-20 backdrop-blur-md">
          <span className="text-[#F3EDF7] text-sm">Profile updated</span>
          <button onClick={() => setShowNotification(false)}>
            <XSquare className="w-4 h-4 text-slate-400 hover:text-white" />
          </button>
        </div>
      )}

      {/* Profile Card */}
      <section className="relative mx-auto mt-14 mb-8 w-full max-w-3xl rounded-2xl p-8 z-10 flex flex-col items-center">
      <div className="flex justify-between w-full">
        
        {/* Avatar/name/ID/edit */}
        <section className="flex items-center justify-center mb-4 w-full">
          <div className="relative">
            <Avatar className="w-20 h-20 ring-2 ring-blue-400">
              <AvatarImage src={USER.avatar.src} alt={USER.name} />
            </Avatar>
            <button
              aria-label="Edit avatar"
              className="absolute right-0 bottom-1 w-6 h-6 flex items-center justify-center bg-blue-950/60 border border-blue-900 rounded-full shadow hover:bg-blue-900/90"
              tabIndex={0}
            >
              <Pen className="w-3 h-3 text-white" />
            </button>
          </div>
          {/* Name & ID */}
          <div className="ml-6">
            {editMode ? (
              <input
                className="font-bold bg-transparent text-xl rounded-md py-1 px-2 text-white focus:outline-none border border-blue-700"
                value={name}
                onChange={e => setName(e.target.value)}
                maxLength={20}
                aria-label="Edit name"
              />
            ) : (
              <h1 className="font-bold text-2xl text-white flex items-center gap-2">{USER.name}</h1>
            )}
            <span className="text-xs text-slate-300 ml-1">{USER.tag}</span>
            {/* Level & XP Bar */}
            <div className="mt-2">
              <span className="text-xs text-blue-300">LVL{USER.level}</span>
              <div className="relative w-28 h-2 bg-blue-900/50 rounded mt-1 overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-2 bg-blue-500 rounded"
                  style={{ width: `${(USER.xp / USER.xpMax) * 100}%` }}
                  aria-label="XP progress"
                />
              </div>
              <span className="text-xs text-slate-400 ml-2">{USER.xp}/{USER.xpMax}</span>
            </div>
          </div>
        </section>
        {/* Rewards */}
        <section className="flex w-full max-w-md mb-5 bg-blue-950/35 border border-[#1A3150] rounded-lg shadow backdrop-blur-lg">
          <div className="flex-1 flex flex-col justify-center pl-6 py-4">
            <span className="text-lg text-white">No Rewards</span>
          </div>
          <div className="w-16 bg-[#248DDC] rounded-r-lg flex flex-col justify-center items-center py-4">
            <button className="flex flex-col items-center">
              <ArrowLeft className="w-4 h-4 mb-1 text-white rotate-180" />
              <span className="text-xs text-white tracking-wide">More</span>
            </button>
          </div>
        </section>
        </div>
        {/* Game Stats */}
        <section className="flex flex-col w-full gap-4">
          {/* Main Stats */}
          <div className="grid grid-cols-2 gap-2 p-4 bg-blue-950/35 border border-[#1A3150] rounded-2xl ">
            <div className="flex flex-col">
              <span className="text-[#248DDC] text-base">Game played</span>
              <span className="text-white text-lg">{USER.stats.gamePlayed}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#248DDC] text-base">Wins</span>
              <span className="text-white text-lg">{USER.stats.wins}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#248DDC] text-base">Gammon</span>
              <span className="text-white text-lg">{USER.stats.gammon}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#248DDC] text-base">Backgammon</span>
              <span className="text-white text-lg">{USER.stats.backgammon}</span>
            </div>
            <div className="flex flex-col col-span-2">
              <span className="text-[#248DDC] text-base">Highest Winstreak</span>
              <span className="text-white text-lg">{USER.stats.highestWinstreak}</span>
            </div>
          </div>
          {/* Tournaments */}
          <div className="grid grid-cols-2 gap-2 p-4 bg-blue-950/35 border border-[#1A3150] rounded-2xl ">
            <div className="flex flex-col">
              <span className="text-[#248DDC] text-base">Tournament played</span>
              <span className="text-white text-lg">{USER.stats.tournamentPlayed}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#248DDC] text-base">Wins</span>
              <span className="text-white text-lg">{USER.stats.tournamentWins}</span>
            </div>
          </div>
        </section>
      </section>
    
    </main>
  );
}

