import { Suspense } from 'react';
import { Outlet } from 'react-router';

import Footer from './footer';
import Header from './header';
import SkeletonCard from './skeleton-card';

export default function Layout() {
  return (
    <div className="bg-secondary flex h-dvh flex-col">
      <Header />
      <main className="w-full flex-1 px-3 pt-4 md:mx-auto md:max-w-5xl">
        <Suspense fallback={<SkeletonCard />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
