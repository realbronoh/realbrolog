'use client';

import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import GlobeIconImg from 'static/images/globe_icon.svg';
import Image from 'next/image';
import { useRouter } from '@/navigation';
import { useParams } from 'next/navigation';
import { convertLocaleToLanguage } from '@/utils/misc';
import {
  LANGUAGE_ENGLISH,
  LANGUAGE_KOREAN,
  LOCALE_ENGLISH,
  LOCALE_KOREAN,
} from '@/constants/intl';

const LanguageSelect = () => {
  const router = useRouter();
  const { locale } = useParams();
  const handleLanguageChange = (lang: string) =>
    router.push(`/`, { locale: lang });
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenu onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild className="focus:outline-none">
        <Button
          variant="ghost"
          className="gap-1 p-2 hover:bg-white hover:underline"
        >
          <GlobeIcon />
          {convertLocaleToLanguage(locale as string)}
          {open ? (
            <ChevronUpIcon className="w-4 h-4" />
          ) : (
            <ChevronDownIcon className="w-4 h-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="px-4"
          onClick={() => handleLanguageChange(LOCALE_ENGLISH)}
        >
          {LANGUAGE_ENGLISH}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="px-4"
          onClick={() => handleLanguageChange(LOCALE_KOREAN)}
        >
          {LANGUAGE_KOREAN}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const GlobeIcon = () => {
  return (
    <Image
      src={GlobeIconImg}
      alt="globe-icon"
      className="h-4 w-4"
      width={16}
      height={16}
    />
  );
};

export default LanguageSelect;
