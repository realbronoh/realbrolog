import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

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
  const footer = (
    <footer>
      <p>footer</p>
    </footer>
  );
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        {footer}
      </body>
    </html>
  );
}
