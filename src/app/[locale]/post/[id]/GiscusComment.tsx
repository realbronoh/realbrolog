'use client';

import Giscus from '@giscus/react';
const GiscusComments = (props: { lang: string }) => {
  const { lang } = props;
  return (
    <>
      <div className="h-8 sm:h-10" />
      <Giscus
        repo="realbronoh/giscus-realbrolog"
        repoId="R_kgDOMxo2AA"
        category="Announcements"
        categoryId="DIC_kwDOMxo2AM4CiePa"
        mapping="url"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="light"
        lang={lang}
        loading="lazy"
      />
    </>
  );
};

export default GiscusComments;
