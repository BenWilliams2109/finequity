'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { UserDataProvider } from '../context/UserDataContext';
import { AnimatePresence } from 'framer-motion';
import Header from '../components/layout/Header'; 
import Footer from '../components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserDataProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <AnimatePresence mode="wait">
                {children}
              </AnimatePresence>
            </main>
            <Footer />
          </div>
        </UserDataProvider>
      </body>
    </html>
  );
}