"use client";
import Image from "next/image";
import { Search, UserPlus, MoreVertical, Dot } from "lucide-react";
import styles from "./friends.module.css";
import Modal from "@/components/modal";
import { useState } from "react";

// Per "Strict Types" rule: Interface for our data model.
interface Friend {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline";
  mutualFriends: number;
}

// Mock data to build the UI without a backend.
const mockFriends: Friend[] = [
  {
    id: "1",
    name: "PlayerOne",
    avatar: "/images/avatar1.png",
    status: "online",
    mutualFriends: 5,
  },
  {
    id: "2",
    name: "Checkmate_Champ",
    avatar: "/images/avatar2.png",
    status: "offline",
    mutualFriends: 2,
  },
  {
    id: "3",
    name: "Dice_Roller",
    avatar: "/images/avatar3.png",
    status: "online",
    mutualFriends: 8,
  },
  {
    id: "4",
    name: "Backgammon_Pro",
    avatar: "/images/avatar4.png",
    status: "offline",
    mutualFriends: 12,
  },
];

const FriendCard = ({ friend }: { friend: Friend }) => (
  <div className='bg-gray-800/50 rounded-lg p-4 flex items-center justify-between transition-all hover:bg-gray-800/80'>
    <div className='flex items-center space-x-4'>
      <Image
        src={friend.avatar}
        alt={`${friend.name}'s avatar`}
        width={48}
        height={48}
        className='rounded-full ring-2 ring-gray-700'
      />
      <div>
        <p className='font-semibold text-white'>{friend.name}</p>
        <div className='flex items-center text-sm text-gray-400'>
          <Dot
            className={`-ml-2 ${
              friend.status === "online" ? "text-green-500" : "text-gray-500"
            }`}
          />
          <span>{friend.status === "online" ? "Online" : "Offline"}</span>
        </div>
      </div>
    </div>
    <div className='flex items-center space-x-2'>
      <button className='p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors'>
        <UserPlus size={18} />
      </button>
      <button className='p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-gray-300 transition-colors'>
        <MoreVertical size={18} />
      </button>
    </div>
  </div>
);

const FriendsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        hi
      </Modal>
      <main className={styles.container}>
        <header className='flex flex-col md:flex-row md:items-center md:justify-between mb-6'>
          <h1
            onClick={() => setIsModalOpen(true)}
            className='text-3xl font-bold text-white mb-4 md:mb-0'
          >
            Friends
          </h1>
          <div className='flex items-center space-x-2'>
            <div className='relative flex-grow'>
              <Search
                className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
                size={20}
              />
              <input
                type='text'
                placeholder='Search friends...'
                className='w-full bg-gray-800 border border-gray-700 rounded-md pl-10 pr-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none'
              />
            </div>
            <button className='flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-md transition-colors'>
              <UserPlus size={20} />
              <span className='hidden sm:inline'>Add Friend</span>
            </button>
          </div>
        </header>

        <nav className='flex space-x-4 border-b border-gray-700 mb-6'>
          <button className='py-2 px-1 text-white border-b-2 border-indigo-500 font-semibold'>
            All (12)
          </button>
          <button className='py-2 px-1 text-gray-400 hover:text-white transition-colors'>
            Pending (2)
          </button>
          <button className='py-2 px-1 text-gray-400 hover:text-white transition-colors'>
            Blocked (0)
          </button>
        </nav>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          {mockFriends.map((friend) => (
            <FriendCard key={friend.id} friend={friend} />
          ))}
        </div>
      </main>
    </>
  );
};

export default FriendsPage;
