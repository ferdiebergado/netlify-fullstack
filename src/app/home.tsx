import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { paths } from './routes';

export default function Home() {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center justify-center gap-5">
      <h1 className="font-heading p-3 text-3xl font-semibold">Welcome</h1>
      <Button size="lg" onClick={() => navigate(paths.signin)}>
        Get started
      </Button>
    </section>
  );
}
