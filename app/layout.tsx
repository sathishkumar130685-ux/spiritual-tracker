import './globals.css';
import { Inter } from 'next/font-awesome'; // Or just skip font for now
// 1. Move themeColor here
export const viewport = {
  themeColor: '#7c3aed',
  width: 'device-width',
  initialScale: 1,
};

// 2. Keep the rest here
export const metadata = {
  title: 'PranaTrack',
  manifest: '/manifest.json', // This is the "App" trigger
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
        <nav className="p-4 bg-white border-b flex justify-center space-x-6 text-sm font-bold">
            <a href="/tracker" className="text-slate-600 hover:text-purple-600">TRACKER</a>
            <a href="/report" className="text-slate-600 hover:text-purple-600">REPORT</a>
        </nav>
      </body>
    </html>
  );
}