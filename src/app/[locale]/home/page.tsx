import StyledLink from '@/components/StyledLink';
import { REALBROLOG_NAME } from '@/constants/misc';
import { LINKEDIN_PROFILE_URL } from '@/constants/personalInfo';
import { unstable_setRequestLocale } from 'next-intl/server';
import React from 'react';

interface HomePageProps {
  params: {
    locale: string;
  };
}

export const metadata = {
  title: `${REALBROLOG_NAME} | About`,
};

const HomePage = ({ params: { locale } }: HomePageProps) => {
  unstable_setRequestLocale(locale);
  return (
    <main className="prose">
      <section>
        <h1>
          Hello 🙌
          <br />
          I'm realbro
        </h1>

        <p>
          I'm a <span className="text-sky-700">indie programmer.</span>
          <br />I worked as a{' '}
          <span className="text-sky-700">
            software developer for 2.5 years
          </span>{' '}
          at <StyledLink href="https://vrew.ai/en/">Voyagerx Inc</StyledLink>. ,
          an AI startup in South Korea 🇰🇷
        </p>
        <p>
          Recently, I've been making small programs, reading books and articles,
          and studying math.
          <br />I like reading books📚, especially those about human
          misjudgments.
        </p>
        <p>
          For more information, feel free to{' '}
          <StyledLink href={LINKEDIN_PROFILE_URL}>contact me</StyledLink>.
        </p>
      </section>
    </main>
  );
};

export default HomePage;
