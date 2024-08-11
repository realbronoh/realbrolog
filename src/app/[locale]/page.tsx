import { redirect } from '@/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';

interface HomePageProps {
  params: {
    locale: string;
  };
}

const Home = ({ params: { locale } }: HomePageProps) => {
  unstable_setRequestLocale(locale);
  return redirect('/about');
};

export default Home;
