'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Landmark } from 'lucide-react';

export default function AddMoneyPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Landmark className="h-6 w-6" />
            <CardTitle>Add Money</CardTitle>
          </div>
          <CardDescription>
            Add money to your wallet using UPI, debit/credit card, or net banking.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button>Add Money</Button>
        </CardContent>
      </Card>
    </div>
  );
}
