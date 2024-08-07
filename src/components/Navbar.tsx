import React from 'react';
// import MenuIcon from '../../images/burgerbar.svg';
import MenuIcon from '../../static/images/burgerbar.svg';
import Link from 'next/link';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { NAVIGATION_ITEMS } from '@/constants/navbar';

const Navbar = () => {
  return (
    <header className="w-full bg-background border-b">
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
      <span className="text-xl font-semibold italic">Realbrolog</span>
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

const NavigationNarrow = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Image
            className="w-6 h-6"
            src={MenuIcon}
            alt="realbrolog"
            width="24"
            height="24"
          />
          <span className="sr-only">Toggle navigation</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="md:hidden w-full">
        <nav className="py-4">
          {NAVIGATION_ITEMS.map((item) => {
            const { name, href } = item;
            return (
              <Link
                key={`nav-narrow-${name}`}
                href={href}
                className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary hover:bg-slate-100 transition-colors p-4"
                prefetch={false}
              >
                {name}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default Navbar;
