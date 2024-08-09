import { Metadata } from 'next';
import './_style.scss';
import { Providers } from './GlobalRedux/provider';

export const metadata: Metadata = {
  title: 'Pokemon',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
