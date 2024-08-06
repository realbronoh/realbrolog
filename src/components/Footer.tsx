import Link from 'next/link';
import Image from 'next/image';
import { NAVIGATION_ITEMS } from '@/constants/navbar';
import { SOCIAL_ITEMS } from '@/constants/footer';

const Footer = () => {
  return (
    <footer className="py-8 border-t">
      <div className="mx-auto max-w-3xl flex flex-col-reverse items-center justify-between px-12 gap-8 sm:flex-row md:items-start">
        <MainLogo />
        <SubTabs />
      </div>
    </footer>
  );
};

const MainLogo = () => {
  return (
    <div className="flex flex-col items-start gap-2 md:gap-4">
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <span className="font-semibold text-lg italic">Realbrolog</span>
      </Link>
      <div>blog of realbro</div>
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
    <div className="flex flex-col gap-2">
      <h3 className="font-medium">Social</h3>
      <div className="flex gap-2 xs:flex-col">
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
              <span className="hidden xs:inline">{name}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Footer;
