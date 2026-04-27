import { Outlet } from 'react-router';
import Footer from './footer';
import Header from './header';

export default function Layout() {
  return (
    <div className="flex h-dvh flex-col bg-neutral-50 dark:bg-neutral-950">
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 p-3">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
