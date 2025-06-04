import './globals.css';
import WebSocketProvider from '@/components/WebSocketProvider';
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
        <WebSocketProvider>
          {children}
        </WebSocketProvider>
      </body>
    </html>
  );
}