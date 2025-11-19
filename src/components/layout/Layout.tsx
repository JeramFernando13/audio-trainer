import type { ReactNode } from 'react';
// import { ThemeToggle } from '../theme/ThemeToggle';
import { Footer } from './Footer';
import { NavBar } from './NavBar';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavBar />
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};