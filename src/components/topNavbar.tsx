"use client";
import React, { useState } from "react";
import Link from "next/link";
import ButtonComponent from "./button";
import { Menu, X } from "lucide-react";

const TopNavbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className='bg-dark-primary/70 backdrop-blur-md fixed top-0 left-0 w-full z-20 px-4 md:px-8 lg:px-16 py-4'>
      <div className='container mx-auto flex items-center justify-between'>
        {/* Logo */}
        <Link href='/' className='text-lg font-bold tracking-tight'>
          Backgammon
        </Link>

        {/* Mobile Menu Button */}
        <button
          className='md:hidden text-white focus:outline-none'
          onClick={toggleMenu}
          aria-label='Toggle menu'
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <nav className='hidden md:flex items-center space-x-6'>
          <ButtonComponent label='Play' variant='primary' size='md' />
          <ButtonComponent label='Learn' variant='secondary' size='md' />
          <ButtonComponent label='About' variant='secondary' size='md' />
        </nav>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <nav className='md:hidden bg-dark-primary/90 w-full py-4 mt-4'>
          <div className='container mx-auto flex flex-col items-center space-y-4'>
            <ButtonComponent label='Play' variant='primary' size='md' />
            <ButtonComponent label='Learn' variant='secondary' size='md' />
            <ButtonComponent label='About' variant='secondary' size='md' />
          </div>
        </nav>
      )}
    </header>
  );
};

export default TopNavbar;
