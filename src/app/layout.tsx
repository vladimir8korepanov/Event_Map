import React from 'react';
import './globals.css';
import { Providers } from '@/shared/providers/Providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='ru'>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}