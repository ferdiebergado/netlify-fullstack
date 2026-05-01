import { RiMore2Fill } from '@remixicon/react';
import type { ColumnDef } from '@tanstack/react-table';

import { DataTable } from '@/components/data-table';
import SortButton from '@/components/sort-button';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'status',
    header: ({ column }) => <SortButton column={column}>Status</SortButton>,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <SortButton column={column}>Email</SortButton>,
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => <SortButton column={column}>Amount</SortButton>,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <RiMore2Fill className="size-4" />
              </Button>
            }
          />

          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

function getData(): Payment[] {
  return [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
    },
    {
      id: '728ed52g',
      amount: 500,
      status: 'success',
      email: 'h@example.com',
    },
  ];
}

export default function Dashboard() {
  const data = getData();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-heading p-3 text-2xl font-semibold">Dashboard</CardTitle>
        <CardDescription>Card Description</CardDescription>
        <CardAction>Card Action</CardAction>
      </CardHeader>
      <CardContent>
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={data} />
        </div>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}
