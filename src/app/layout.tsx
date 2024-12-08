import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Navigation from '@/components/Navigation';
import StyledComponentsRegistry from '@/lib/registry';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Cars.co.za',
  description: 'Your trusted source for buying and selling cars in South Africa',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`} style={{ backgroundColor: '#f5f6f8' }}>
        <StyledComponentsRegistry>
          <Navigation />
          <main>{children}</main>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
