'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRightLeft } from 'lucide-react';
import { OraIcon, InrIcon } from '@/lib/data.tsx';
import { useUser, useDoc, useFirestore } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const CONVERSION_RATE = 1000; // 1000 ORA = 1 INR

export default function ConvertPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const userDocRef = user ? doc(firestore, 'users', user.uid) : null;
  const { data: userProfile, loading } = useDoc(userDocRef);

  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [isConverting, setIsConverting] = useState(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and a single decimal point
    if (/^\d*\.?\d*$/.test(value)) {
      setFromAmount(value);
      const fromValue = parseFloat(value);
      if (!isNaN(fromValue) && fromValue > 0) {
        setToAmount((fromValue / CONVERSION_RATE).toFixed(2));
      } else {
        setToAmount('');
      }
    }
  };

  const handleConvert = async () => {
    if (!userDocRef || !userProfile) return;

    const oraToConvert = parseFloat(fromAmount);
    if (isNaN(oraToConvert) || oraToConvert <= 0) {
      toast({
        variant: 'destructive',
        title: 'Invalid Amount',
        description: 'Please enter a valid amount to convert.',
      });
      return;
    }

    if (oraToConvert > (userProfile.oraBalance ?? 0)) {
      toast({
        variant: 'destructive',
        title: 'Insufficient Balance',
        description: 'You do not have enough ORA to complete this conversion.',
      });
      return;
    }

    setIsConverting(true);
    const inrToAdd = oraToConvert / CONVERSION_RATE;
    const newOraBalance = (userProfile.oraBalance ?? 0) - oraToConvert;
    const newInrBalance = (userProfile.inrBalance ?? 0) + inrToAdd;

    try {
      await updateDoc(userDocRef, {
        oraBalance: newOraBalance,
        inrBalance: newInrBalance,
      });

      toast({
        title: 'Conversion Successful',
        description: `You have converted ${oraToConvert.toLocaleString()} ORA to ${inrToAdd.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}.`,
      });
      setFromAmount('');
      setToAmount('');
    } catch (error) {
      console.error("Conversion failed: ", error);
      toast({
        variant: 'destructive',
        title: 'Conversion Failed',
        description: 'An error occurred while converting your funds.',
      });
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
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
                  Available balance: {loading ? '...' : (userProfile?.oraBalance?.toLocaleString() || 0)}
                </span>
              </div>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <OraIcon className="h-5 w-5 text-muted-foreground" />
                </div>
                <Input
                  id="from-amount"
                  type="text"
                  inputMode="decimal"
                  placeholder="0"
                  className="pl-10 pr-16"
                  value={fromAmount}
                  onChange={handleAmountChange}
                  disabled={loading || isConverting}
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
                  type="text"
                  placeholder="0.00"
                  className="pl-10 pr-16"
                  readOnly
                  value={toAmount}
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
          <Button className="w-full" onClick={handleConvert} disabled={loading || isConverting || !fromAmount}>
            {isConverting ? 'Converting...' : 'Convert ORA to INR'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
