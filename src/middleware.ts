import createMiddleware from 'next-intl/middleware';
import { LOCALE_ENGLISH, LOCALES } from './constants/intl';

export default createMiddleware({
  // A list of all locales that are supported
  locales: LOCALES,

  // Used when no locale matches
  defaultLocale: LOCALE_ENGLISH,
});

export const config = {
  // Match only internationalized pathnames
  // matcher: ['/', '/(en|ko)/:path*'],
  matcher: ['/', '/(en)/:path*'],
};
