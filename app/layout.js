import './globals.css';
import Preloader from '../components/Preloader';

export const metadata = {
  title: 'CHK Ceylon Tours | Premium Sri Lanka Travel Experience',
  description: 'Explore the soul of Sri Lanka with CHK Ceylon Tours. Bespoke travel packages, expert local guides, and luxury experiences across the Pearl of the Indian Ocean.',
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
      </body>
    </html>
  );
}
