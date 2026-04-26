import config from '@/config';

export default function SplashScreen() {
  return (
    <section className="bg-background fixed inset-0 z-50 flex items-center justify-center">
      <h1 className="font-heading animate-pulse text-center text-4xl font-bold text-indigo-600 text-shadow-lg dark:text-indigo-400">
        {config.appTitle}
      </h1>
    </section>
  );
}
