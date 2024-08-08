import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import UrlLinkIcon from 'static/images/url_link_icon.svg';

export const StyledLink = (props: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link href={props.href} target="_blank">
      {props.children}
      <Image
        src={UrlLinkIcon}
        alt={props.href}
        className="inline w-4 h-4 m-0 ml-1"
      />
    </Link>
  );
};

export default StyledLink;
