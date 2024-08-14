import { ThemeProvider } from '@/utils/ThemeContext';
import Providers from './providers';
import './globals.scss';
import './colors.scss';

export const metadata = {
  title: 'FreezoneX FreeFlow',
  description: 'FreezoneX FreeFlow',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Providers>
            <div className="ml-[16rem]">{children}</div>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
