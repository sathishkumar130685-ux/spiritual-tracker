import './globals.css';
// Replace the red-lined 'next/font-awesome' with this:
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Change 'faHandsPrays' to 'faHandsPraying'
import { faHandsPraying, faOm, faCircleCheck } from '@fortawesome/free-solid-svg-icons';

// In your component:
<FontAwesomeIcon icon={faHandsPraying} className="text-purple-600" />
// 1. Move themeColor here



import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#7c3aed", // Your PranaTrack Purple
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "PranaTrack",
  description: "Sathish Kumar - Spiritual Tracker",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PranaTrack",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Force the standalone mode for older browsers */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body>{children}</body>
    </html>
  );
}

