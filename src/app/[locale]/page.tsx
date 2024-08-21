import { redirect } from '@/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';

interface RootPageProps {
  params: {
    locale: string;
  };
}

const RootPage = ({ params: { locale } }: RootPageProps) => {
  unstable_setRequestLocale(locale);
  return redirect('/home');
};

export default RootPage;
