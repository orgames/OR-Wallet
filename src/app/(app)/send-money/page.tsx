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
import { currencies } from '@/lib/data.tsx';
import { useState } from 'react';

export default function SendMoneyPage() {
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0].code);

  const selectedCoin = currencies.find((c) => c.code === selectedCurrency);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Send className="h-6 w-6" />
            <CardTitle>Send Money</CardTitle>
          </div>
          <CardDescription>
            Send funds to another wallet.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {currencies.map((currency) => (
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
              <Label htmlFor="recipient-address">Recipient Address</Label>
              <Input id="recipient-address" placeholder="Enter recipient's ORA address" />
            </div>

            <div className="flex items-end gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input id="amount" type="number" placeholder="0.00" />
              </div>
              <div className="w-[120px] space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {selectedCoin && (
              <div className="text-sm text-muted-foreground">
                Available: {selectedCoin.balance.toLocaleString()} {selectedCoin.code}
              </div>
            )}
          </div>

          <Button className="w-full">
            <Send className="mr-2 h-4 w-4" />
            Send
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
