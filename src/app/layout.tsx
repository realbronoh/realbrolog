import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Center from '@/components/Center';
import { pretendard } from '@/utils/font';

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
      <body className={pretendard.className}>
        <Navbar />
        <Center>{children}</Center>
        <Footer />
      </body>
    </html>
  );
}
