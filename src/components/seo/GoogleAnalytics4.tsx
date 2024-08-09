import { GOOGLE_ANALYTICS_ID } from '@/constants/seo';
import { GoogleAnalytics } from '@next/third-parties/google';
import React from 'react';

const GA4 = () => {
  return <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID} />;
};

export default GA4;
