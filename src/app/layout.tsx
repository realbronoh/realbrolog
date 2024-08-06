import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Center from '@/components/Center';

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
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <Center>{children}</Center>
        <Footer />
      </body>
    </html>
  );
}
