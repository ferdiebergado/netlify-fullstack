import { Skeleton } from './ui/skeleton';

export default function SkeletonPageHeader() {
  return (
    <div className="flex items-center justify-between gap-5 px-7 py-5">
      <div>
        <Skeleton className="h-8 w-71.25" />
        <Skeleton className="h-3 w-71.25" />
      </div>
    </div>
  );
}
