import { Suspense } from 'react';
import { Outlet } from 'react-router';

import Footer from './footer';
import Header from './header';
import SkeletonPage from './skeleton-page';

export default function Layout() {
  return (
    <div className="bg-background flex h-dvh flex-col">
      <Header />
      <main className="w-full flex-1 p-3 md:mx-auto md:max-w-5xl md:p-0">
        <Suspense fallback={<SkeletonPage />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
