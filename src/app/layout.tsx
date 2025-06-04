import './globals.css';
import WebSocketProvider from '@/components/WebSocketProvider';
import '@fontsource/inter/index.css';
import '@fontsource/space-grotesk/index.css';
export const metadata = {
  title: 'Tex SG',
  description: 'Live cognitive dashboard',
};

export default function RootLayout({ children }) {
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
