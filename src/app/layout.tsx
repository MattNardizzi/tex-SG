// ❌ REMOVE "use client" from this file
// ✅ metadata will now work

import './globals.css';
import '@fontsource/inter/index.css';
import '@fontsource/space-grotesk/index.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Tex SG',
  description: 'Live cognitive dashboard',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}