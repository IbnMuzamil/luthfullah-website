import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

// Can be imported from a shared config
const locales = ['en', 'ar', 'de'];

export default getRequestConfig(async (context) => {
  let locale = context.locale;
  
  // If locale is not provided directly, try to get it from requestLocale
  if (!locale && context.requestLocale) {
    locale = await context.requestLocale;
  }

  console.log('getRequestConfig final locale:', locale);
  
  // Validate that the incoming `locale` parameter is valid
  if (!locale || !locales.includes(locale as any)) {
    console.log('Invalid or missing locale:', locale);
    notFound();
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
