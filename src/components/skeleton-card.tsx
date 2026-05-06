import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function SkeletonCard() {
  return (
    <Card className="w-full">
      <CardHeader>
        <Skeleton className="h-7 w-1/4" />
        <Skeleton className="h-4 w-1/3" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-28 w-full" />
      </CardContent>
    </Card>
  );
}
