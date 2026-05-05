import { Suspense } from 'react';
import { Outlet } from 'react-router';

import Footer from './footer';
import Header from './header';
import SkeletonPage from './skeleton-page';

export default function Layout() {
  return (
    <div className="bg-background flex h-dvh flex-col">
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 p-3">
        <Suspense fallback={<SkeletonPage />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
