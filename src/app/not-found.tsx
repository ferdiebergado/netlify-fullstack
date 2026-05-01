import { RiCloseLargeLine } from '@remixicon/react';
import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { paths } from './routes';

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <Empty className="flex h-dvh items-center justify-center bg-neutral-50 dark:bg-neutral-900">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <RiCloseLargeLine />
        </EmptyMedia>
        <EmptyTitle className="text-4xl font-semibold">Page not found</EmptyTitle>
        <EmptyDescription>The page you're looking for doesn't exist.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <Button onClick={() => navigate(paths.home)}>Home</Button>
        <Button variant="outline" onClick={() => navigate(-1)}>
          Go back
        </Button>
      </EmptyContent>
    </Empty>
  );
}
