import './globals.css';
import Preloader from '../components/Preloader';
import ReviewFloatingButton from '../components/ReviewFloatingButton';
import WhatsAppButton from '../components/WhatsAppButton';

export const metadata = {
  title: 'CHK Ceylon Tours | Premium Sri Lanka Travel & Tour Experts',
  description: 'Experience the authentic soul of Sri Lanka with CHK Ceylon Tours. Bespoke travel packages, expert local guides, luxury hotels, and unforgettable island adventures.',
  keywords: 'Sri Lanka tours, Ceylon travel, Sri Lanka tour packages, luxury travel Sri Lanka, best tour guide Sri Lanka, Sri Lanka vacation, CHK Ceylon Tours',
  authors: [{ name: 'CHK Ceylon Tours' }],
  robots: 'index, follow',
  alternates: {
    canonical: 'https://www.chkceylontours.com',
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'CHK Ceylon Tours | Premium Sri Lanka Travel Experience',
    description: 'Explore pristine beaches, ancient ruins, and emerald tea hills with Sri Lanka\'s #1 tour experts.',
    url: 'https://www.chkceylontours.com',
    siteName: 'CHK Ceylon Tours',
    images: [
      {
        url: 'https://www.chkceylontours.com/home_hero_bg.png',
        width: 1200,
        height: 630,
        alt: 'CHK Ceylon Tours - Sri Lanka Travel',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CHK Ceylon Tours | Visit Sri Lanka',
    description: 'Bespoke travel packages and luxury experiences across the Pearl of the Indian Ocean.',
    images: ['https://www.chkceylontours.com/home_hero_bg.png'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;900&family=Playfair+Display:wght@700;900&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body suppressHydrationWarning>
        <Preloader />
        <div id="root">{children}</div>
        <ReviewFloatingButton />
        <WhatsAppButton />
      </body>
    </html>
  );
}
