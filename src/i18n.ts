import { redirect } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { LOCALE_ENGLISH, LOCALES } from './constants/intl';

// Can be imported from a shared config
const locales = LOCALES;

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    return redirect(`/${LOCALE_ENGLISH}`);
  }

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
