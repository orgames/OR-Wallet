'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Landmark, ArrowRightLeft, Award } from 'lucide-react';
import { OraIcon, InrIcon } from '@/lib/data.tsx';
import Link from 'next/link';

export default function DashboardPage() {

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-6">
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

        <Card>
          <CardHeader>
            <CardTitle>Convert</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="from-amount">From</Label>
                  <span className="text-sm text-muted-foreground">
                    Available balance: 90
                  </span>
                </div>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <OraIcon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Input
                    id="from-amount"
                    type="number"
                    placeholder="0"
                    className="pl-10 pr-16"
                    defaultValue="0"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="font-semibold">ORA</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <Button variant="ghost" size="icon">
                  <ArrowRightLeft className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="to-amount">To</Label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <InrIcon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Input
                    id="to-amount"
                    type="number"
                    placeholder="--"
                    className="pl-10 pr-16"
                    readOnly
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="font-semibold">INR</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center text-sm text-muted-foreground">
              1,000 ORA ≈ ₹1
            </div>
            <Button className="w-full">Convert ORA to INR</Button>
          </CardContent>
        </Card>
      </div>
      <div className="mt-4 flex items-center justify-center">
        <Link href="/rewards" className="flex items-center gap-2 text-sm font-medium text-primary hover:underline">
          <Award className="h-4 w-4" />
          Earn Rewards
        </Link>
      </div>
    </div>
  );
}
