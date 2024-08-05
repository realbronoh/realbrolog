import Link from 'next/link';
import LogoIcon from '../images/book_icon.svg';
import Image from 'next/image';
import { NAVIGATION_ITEMS } from '@/constants/navbar';
import { SOCIAL_ITEMS } from '@/constants/footer';

const Footer = () => {
  return (
    <footer className="bg-muted py-12 border-t">
      <div className="max-w-5xl flex flex-col-reverse items-center justify-between px-12 gap-8 md:flex-row md:items-start">
        <MainLogo />
        <SubTabs />
      </div>
    </footer>
  );
};

const MainLogo = () => {
  return (
    <div className="flex flex-col items-start gap-4">
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <Image
          className="w-6 h-6"
          src={LogoIcon}
          alt="realbrolog"
          width="24"
          height="24"
        />
        <span className="font-bold text-lg">Realbrolog</span>
      </Link>
      <div className="text-base ml-8">blog of realbro</div>
    </div>
  );
};

const SubTabs = () => {
  return (
    <div className="flex flex-col xs:flex-row gap-6 xs:gap-24">
      <Pages />
      <Social />
    </div>
  );
};

const Pages = () => {
  return (
    <div className="grid gap-2 sm:col-span-2 md:col-span-1">
      <h3 className="font-medium">Pages</h3>
      {NAVIGATION_ITEMS.map((item) => {
        const { name, href } = item;
        return (
          <Link
            key={`footer-${name}`}
            href={href}
            className="text-sm hover:underline"
            prefetch={false}
          >
            {name}
          </Link>
        );
      })}
    </div>
  );
};

const Social = () => {
  return (
    <div className="grid gap-2 sm:col-span-2 md:col-span-1">
      <h3 className="font-medium">Social</h3>
      {SOCIAL_ITEMS.map((item) => {
        const { name, logo, url } = item;
        return (
          <a
            key={`footer-social-${name}`}
            href={url}
            className="flex items-center gap-2 text-sm hover:underline"
            target="_blank"
          >
            <Image
              className="w-5 h-5"
              src={logo}
              alt={name}
              width="24"
              height="24"
            />
            <span>{name}</span>
          </a>
        );
      })}
    </div>
  );
};

export default Footer;
