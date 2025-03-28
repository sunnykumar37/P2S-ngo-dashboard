'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { isAuthenticated } from '@/utils/auth';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated() && !pathname.startsWith('/login') && !pathname.startsWith('/signup')) {
        router.push('/login');
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [pathname, router]);

  if (isLoading) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
} 