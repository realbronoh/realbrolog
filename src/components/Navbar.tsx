import React from 'react';
import Link from 'next/link';
import { NAVIGATION_ITEMS } from '@/constants/navbar';
import NavigationNarrow from './NavigationNarrow';
import { REALBROLOG_NAME } from '@/constants/misc';

const Navbar = () => {
  return (
    <header className=" sticky top-0 opacity-90 w-full bg-background border-b">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6 max-w-3xl">
        <MainLogo />
        <NavigationWide />
        <NavigationNarrow />
      </div>
    </header>
  );
};

const MainLogo = () => {
  return (
    <Link href="/" className="flex items-center gap-2" prefetch={false}>
      <span className="text-xl font-semibold italic">{REALBROLOG_NAME}</span>
    </Link>
  );
};

const NavigationWide = () => {
  return (
    <nav className="hidden md:flex items-center gap-2">
      {NAVIGATION_ITEMS.map((item) => {
        const { name, href } = item;
        return (
          <Link
            key={`nav-wide-${name}`}
            href={href}
            className="text-sm font-medium text-center text-foreground hover:underline transition-colors px-2 py-2 rounded-sm"
            prefetch={false}
          >
            {name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navbar;
