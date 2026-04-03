import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'ar', 'de'],

  // Used when no locale matches
  defaultLocale: 'en',
  localePrefix: 'always'
});

export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Match all pathnames except for
    // - API routes
    // - Static files (_next, images, etc.)
    // - Admin/Dashboard/CMS
    '/((?!api|admin|dashboard|cms|_next|_vercel|.*\\..*).*)',
    // Match all pathnames starting with a locale
    '/(ar|en|de)/:path*'
  ]
};

console.log('Middleware loaded');
