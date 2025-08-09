import type { Metadata } from "next";
import localFont from 'next/font/local'
import { Barlow } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Image from "next/image"
import { Analytics } from "@vercel/analytics/next"
import { TailwindHelper } from "@/components/TailwindHelper";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"]
});

const colby = localFont({
  variable: "--font-colby",
  src: [
    {
      path: './fonts/colby-wdblk.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/colby-wdblk.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
})

const kiante = localFont({
  variable: "--font-kiante",
  src: [
    {
      path: './fonts/flipkeys-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/flipkeys-regular.woff',
      weight: '400',
      style: 'normal',
    },
  ],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.bloomsuniverse.com'),
  title: {
    default: 'Blooms Universe | Fine Gold Jewelry Inspired by Caribbean Heritage',
    template: '%s | Blooms Universe'
  },
  description: 'Blooms Universe creates fine gold jewelry inspired by the founder’s Caribbean roots, blending island heritage, cultural storytelling, and New York sophistication into timeless handcrafted pieces.',
  applicationName: 'Blooms Universe',
  keywords: [
    'fine jewelry',
    'gold jewelry',
    'Caribbean jewelry',
    'luxury jewelry',
    'handcrafted gold',
    'Blooms Universe',
    'ethical gold',
    'St. Thomas VI jewelry',
    'heritage jewelry',
    'New York jewelry brand'
  ],
  authors: [
    { name: 'Briana Gude', url: 'https://www.brianagude.com' },
    { name: 'Blooms Universe', url: 'https://www.bloomsuniverse.com' }
  ],
  creator: 'Blooms Universe',
  publisher: 'Blooms Universe',
  openGraph: {
    type: 'website',
    url: 'https://www.bloomsuniverse.com',
    title: 'Blooms Universe | Fine Gold Jewelry Inspired by Caribbean Heritage',
    description: 'Discover handcrafted gold jewelry that embodies Caribbean culture and luxury craftsmanship. Blooms Universe celebrates heritage, beauty, and timeless design.',
    siteName: 'Blooms Universe',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blooms Universe | Fine Gold Jewelry Inspired by Caribbean Heritage',
    description: 'Handcrafted gold jewelry inspired by Caribbean tradition and refined in New York. Wearing gold is wearing a story.',
  },
  manifest: '/site.webmanifest',
  category: 'luxury goods',
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${barlow.variable} ${kiante.variable} ${colby.variable} antialiased`}>
      <body className="antialiased min-h-svh flex flex-col relative">
        <Header/>
        <main className="h-full flex flex-col flex-1 relative z-20">
          {children}
        </main>
        {process.env.NODE_ENV === 'development' && <TailwindHelper />}
        <Footer/>
        <Image src="/images/background.jpg" alt="paper texture" fill/>
        <Analytics/>
      </body>
    </html>
  );
}
