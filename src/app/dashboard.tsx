import { DataTable } from '@/components/data-table';
import SortButton from '@/components/sort-button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { ColumnDef } from '@tanstack/react-table';

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
