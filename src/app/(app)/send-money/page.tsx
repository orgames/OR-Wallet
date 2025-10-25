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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Send } from 'lucide-react';
import { currencies, bankNames } from '@/lib/data.tsx';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function SendMoneyPage() {
  const { toast } = useToast();

  const inrCoin = currencies.find((c) => c.code === 'INR');
  
  const handleSendMoney = () => {
    // Logic to save details and initiate transfer would go here
    toast({
      title: 'Transfer Initiated',
      description: 'The money has been sent successfully.',
    });
  };


  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Send className="h-6 w-6" />
            <CardTitle>Send Money</CardTitle>
          </div>
          <CardDescription>
            Send funds to a bank account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {currencies.filter(c => ['ORA', 'INR'].includes(c.code)).map((currency) => (
                <Card key={currency.code}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">{currency.name}</CardTitle>
                    <currency.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{currency.balance.toLocaleString()} {currency.code}</div>
                    <p className="text-xs text-muted-foreground">Available Balance</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="space-y-2">
                <Label htmlFor="account-holder-name">Account Holder Name</Label>
                <Input id="account-holder-name" placeholder="Enter account holder's name" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="account-number">Account Number</Label>
                <Input id="account-number" placeholder="Enter account number" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="ifsc-code">IFSC Code</Label>
                <Input id="ifsc-code" placeholder="Enter IFSC code" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="bank-name">Bank Name</Label>
                <Select>
                    <SelectTrigger id="bank-name">
                        <SelectValue placeholder="Select a bank" />
                    </SelectTrigger>
                    <SelectContent>
                        {bankNames.map((bank) => (
                            <SelectItem key={bank} value={bank}>
                                {bank}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount (INR)</Label>
              <Input id="amount" type="number" placeholder="0.00" />
            </div>
            {inrCoin && (
              <div className="text-sm text-muted-foreground">
                Available: {inrCoin.balance.toLocaleString()} INR
              </div>
            )}
          </div>
          
          <Button className="w-full" onClick={handleSendMoney}>
            <Send className="mr-2 h-4 w-4" />
            Send Money
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
