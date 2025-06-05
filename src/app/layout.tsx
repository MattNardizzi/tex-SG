import './globals.css';
import '@fontsource/inter/index.css';
import '@fontsource/space-grotesk/index.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Tex SG',
  description: 'Live cognitive dashboard',
};

export default function $1({ theme }: { theme: 'blue' | 'purple' })RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}