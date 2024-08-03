import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'realbrolog',
  description: 'blog of realbro',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const header = (
    <header>
      <Link href="/">
        <h1>header</h1>
      </Link>
    </header>
  );
  const footer = (
    <footer>
      <p>footer</p>
    </footer>
  );
  return (
    <html lang="en">
      <body className={inter.className}>
        {header}
        {children}
        {footer}
      </body>
    </html>
  );
}
