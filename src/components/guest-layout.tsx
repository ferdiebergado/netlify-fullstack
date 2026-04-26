import { Outlet } from 'react-router';
import Footer from './footer';

export default function GuestLayout() {
  return (
    <div className="flex h-dvh flex-col bg-neutral-50">
      <main className="flex flex-1 flex-col items-center justify-center p-3">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
