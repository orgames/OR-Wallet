'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRightLeft, Award, Copy, Wallet, Send } from 'lucide-react';
import { OraIcon, InrIcon, currencies, bankNames } from '@/lib/data.tsx';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function DashboardPage() {
  const { toast } = useToast();
  const [walletAddress, setWalletAddress] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('ORA');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const generateWalletAddress = () => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = 'ora_';
      for (let i = 0; i < 34; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
    };
    setWalletAddress(generateWalletAddress());
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to Clipboard',
      description: 'The wallet address has been copied.',
    });
  };
  
  const handleSaveDetails = () => {
    // Logic to save details and initiate transfer would go here
    toast({
      title: 'Transfer Initiated',
      description: 'The money has been sent successfully.',
    });
    setIsDialogOpen(false);
  };

  const selectedCoin = currencies.find((c) => c.code === selectedCurrency);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-6">
            <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                <Wallet className="h-6 w-6" />
                <CardTitle>Your ORA Wallet</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <Label htmlFor="wallet-address">Your unique ORA address</Label>
                <div className="flex items-center gap-2">
                <Input id="wallet-address" readOnly value={walletAddress} className="flex-grow font-mono text-xs" />
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => copyToClipboard(walletAddress)}>
                    <Copy className="h-4 w-4" />
                </Button>
                </div>
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
                        Available balance: 0
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
        <div className="flex flex-col gap-6">
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
                    <Label htmlFor="recipient-address-home">Recipient Address</Label>
                    <Input id="recipient-address-home" placeholder="Enter recipient's ORA address" />
                    </div>

                    <div className="flex items-end gap-4">
                    <div className="flex-1 space-y-2">
                        <Label htmlFor="amount-home">Amount</Label>
                        <Input id="amount-home" type="number" placeholder="0.00" />
                    </div>
                    <div className="w-[120px] space-y-2">
                        <Label htmlFor="currency-home">Currency</Label>
                        <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                        <SelectTrigger id="currency-home">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            {currencies.filter(c => ['ORA', 'INR'].includes(c.code)).map((currency) => (
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
                
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                    <Button className="w-full">
                        <Send className="mr-2 h-4 w-4" />
                        Proceed to Send
                    </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Bank Details</DialogTitle>
                        <DialogDescription>
                        Enter the recipient&apos;s bank details to send Ora Coins. These details will be saved for future use.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                        <Label htmlFor="account-holder-name-home">Account Holder Name</Label>
                        <Input id="account-holder-name-home" defaultValue="John Doe" />
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="account-number-home">Account Number</Label>
                        <Input id="account-number-home" defaultValue="1234567890" />
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="ifsc-code-home">IFSC Code</Label>
                        <Input id="ifsc-code-home" defaultValue="SBIN0001234" />
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="bank-name-home">Bank Name</Label>
                        <Select>
                            <SelectTrigger id="bank-name-home">
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
                    </div>
                    <Button onClick={handleSaveDetails} type="submit" className="w-full">
                        <Send className="mr-2 h-4 w-4" />
                        Send
                    </Button>
                    </DialogContent>
                </Dialog>

                </CardContent>
            </Card>
            <div className="mt-4 flex items-center justify-center">
                <Link href="/rewards" className="flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                <Award className="h-4 w-4" />
                Earn Rewards
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
}
