import { RiArrowUpDownFill } from '@remixicon/react';
import type { Column } from '@tanstack/react-table';
import type { ReactNode } from 'react';
import { Button } from './ui/button';

type SortButtonProps<T> = {
  column: Column<T, unknown>;
  children: ReactNode;
};

export default function SortButton<T>({ column, children }: SortButtonProps<T>) {
  return (
    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
      {children}
      <RiArrowUpDownFill className="ml-2 size-4" data-icon="inline-end" />
    </Button>
  );
}
