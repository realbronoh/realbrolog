import { LINKEDIN_PROFILE_URL } from '@/constants/personalInfo';
import Link from 'next/link';
import React from 'react';

export const metadata = {
  title: `realbrolog | About`,
};

const AboutPage = () => {
  return (
    <main className="prose-sm sm:prose">
      <section>
        <h1>
          Hello 🙌
          <br />
          {"I'm realbro"}
        </h1>

        <p>
          {"I'm a "}
          <span className="text-sky-700">indie programmer.</span>
          <br />I worked as a{' '}
          <span className="text-sky-700">
            software developer for 2.5 years
          </span>{' '}
          at{' '}
          <Link href="https://vrew.ai/en/" target="_blank">
            Voyagerx Inc.
          </Link>
          , an AI startup in South Korea 🇰🇷
        </p>
        <p>
          {
            "Recently, I've been making small programs, reading books and articles, and studying math."
          }
          <br />I like reading books📚, especially about human misjudgments.
        </p>
        <p>
          For more information, feel free to{' '}
          <Link href={LINKEDIN_PROFILE_URL}>contact me.</Link>
        </p>
      </section>
    </main>
  );
};

export default AboutPage;
