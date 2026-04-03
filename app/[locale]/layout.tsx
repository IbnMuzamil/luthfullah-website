import type React from "react"
import type { Metadata } from "next"
import "../globals.css"
import { config } from "@/lib/db"
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { CartProvider } from '@/components/cart/CartProvider';

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await config.get()
  
  return {
    title: siteConfig.header?.brandName 
      ? `${siteConfig.header.brandName} | Charity Construction Platform`
      : "Build Lasting Impact | Charity Construction Platform",
    description: siteConfig.footer?.description || "Transform your charitable intentions into real, completed infrastructure.",
    icons: {
      icon: siteConfig.faviconUrl || "/favicon.ico",
    },
  }
}

export default async function RootLayout({
  children,
  params: {locale}
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string};
}>) {
  console.log('RootLayout locale:', locale);
  const messages = await getMessages({locale});
  
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className={`font-sans antialiased`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <CartProvider>
            {children}
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
