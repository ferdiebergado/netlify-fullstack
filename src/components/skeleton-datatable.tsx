import { Skeleton } from './ui/skeleton';

export default function SkeletonDatatable() {
  return (
    <>
      <div className="flex items-center justify-between py-4">
        <div>
          <Skeleton className="h-9 w-[384px]" />
        </div>
        <div>
          <Skeleton className="h-9 w-[83.56px]" />
        </div>
      </div>
      <div>
        <div>
          <Skeleton className="h-28.5 w-full" />
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Skeleton className="h-8 w-20.5" />
          <Skeleton className="h-8 w-14.25" />
        </div>
      </div>
    </>
  );
}
