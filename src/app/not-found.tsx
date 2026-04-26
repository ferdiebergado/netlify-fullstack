import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { RiCloseLargeLine } from '@remixicon/react';
import { useNavigate } from 'react-router';
import { paths } from './routes';

export default function PageNotFound() {
  const navigate = useNavigate();

  const handleHome = () => navigate(paths.home);
  const handleBack = () => navigate(-1);

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <RiCloseLargeLine />
        </EmptyMedia>
        <EmptyTitle className="text-3xl font-semibold">Page not found</EmptyTitle>
        <EmptyDescription>The page you're looking for doesn't exist.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <Button onClick={handleHome}>Home</Button>
        <Button variant="outline" onClick={handleBack}>
          Go back
        </Button>
      </EmptyContent>
    </Empty>
  );
}
