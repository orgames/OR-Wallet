import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { currencies, transactions, type Transaction } from '@/lib/data.tsx';
import {
  ArrowDownLeft,
  ArrowUpRight,
  MoreHorizontal,
  Plus,
  RefreshCw,
} from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

function TransactionIcon({ type }: { type: Transaction['type'] }) {
  const className = 'h-4 w-4';
  switch (type) {
    case 'sent':
      return <ArrowUpRight className={`${className} text-red-400`} />;
    case 'received':
      return <ArrowDownLeft className={`${className} text-green-400`} />;
    case 'conversion':
      return <RefreshCw className={`${className} text-blue-400`} />;
    case 'deposit':
      return <Plus className={`${className} text-green-400`} />;
  }
}

function StatusBadge({ status }: { status: Transaction['status'] }) {
  const variant = {
    Completed: 'default',
    Pending: 'secondary',
    Failed: 'destructive',
  }[status] as 'default' | 'secondary' | 'destructive';

  // Custom styling for better contrast in our dark theme
  const customClass = {
    Completed: 'bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30',
    Pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/30',
    Failed: 'bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30',
  }[status];

  return <Badge variant="outline" className={customClass}>{status}</Badge>;
}

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
        <div className="ml-auto flex items-center gap-2">
          <Link href="/add-funds">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Funds
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {currencies.map((currency) => (
          <Card key={currency.code}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {currency.name}
              </CardTitle>
              <currency.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {currency.symbol}
                {currency.balance.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: currency.code === 'BTC' || currency.code === 'ETH' ? 8 : 2,
                })}
              </div>
              <p className="text-xs text-muted-foreground">
                {currency.code} Balance
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            A list of your recent transactions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead className="hidden text-right md:table-cell">
                  Amount
                </TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
                <TableHead className="hidden text-right lg:table-cell">Date</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.slice(0, 5).map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <span className="hidden rounded-full bg-secondary p-2 sm:flex">
                        <TransactionIcon type={tx.type} />
                      </span>
                      <div>
                        <div className="font-medium">{tx.description}</div>
                        <div className="text-sm text-muted-foreground md:hidden">
                          {tx.type === 'sent' ? '-' : '+'}
                          {tx.amount.toLocaleString()} {tx.currency}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden text-right font-mono md:table-cell">
                    {tx.type === 'sent' ? '-' : '+'}
                    {tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 8 })} {tx.currency}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <StatusBadge status={tx.status} />
                  </TableCell>
                  <TableCell className="hidden text-right lg:table-cell">
                    {new Date(tx.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Repeat Transaction</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
