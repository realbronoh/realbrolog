'use client';

import MenuIcon from 'static/images/burgerbar.svg';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { NAVIGATION_ITEMS } from '@/constants/navbar';
import { useState } from 'react';
import { REALBROLOG_NAME } from '@/constants/misc';
import { Link } from '@/navigation';
import LanguageSelect from './LanguageSelect';

const NavigationNarrow = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="flex md:hidden">
      <div className="md:hidden">
        <LanguageSelect />
      </div>
      <Sheet open={open} onOpenChange={(open) => setOpen(open)}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen(true)}
          >
            <Image
              className="w-6 h-6"
              src={MenuIcon}
              alt={REALBROLOG_NAME}
              width="24"
              height="24"
            />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="md:hidden w-full"
          onClick={() => setOpen(false)}
        >
          <nav className="py-4">
            {NAVIGATION_ITEMS.map((item) => {
              const { name, href } = item;
              return (
                <Link
                  key={`nav-narrow-${name}`}
                  href={href}
                  className="flex items-center gap-2 text-sm font-medium text-foreground transition-colors p-4 hover:text-primary hover:bg-slate-100 hover:underline"
                  prefetch={false}
                >
                  {name}
                </Link>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NavigationNarrow;
