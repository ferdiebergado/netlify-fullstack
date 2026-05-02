import { Outlet } from 'react-router';
import Footer from './footer';
import Header from './header';

export default function GuestLayout() {
  return (
    <div className="flex h-dvh flex-col bg-neutral-50 dark:bg-neutral-950">
      <div className="pointer-events-none opacity-0">
        <Header />
      </div>
      <main className="mx-auto flex w-full max-w-5xl flex-1 items-center justify-center p-3">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
