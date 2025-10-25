'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { History, Send, Copy, Link as LinkIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export default function DashboardPage() {
  const { toast } = useToast();
  const [oraAddress] = useState('ORALNXKWCAZ');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(oraAddress);
    toast({
      title: 'Address Copied',
      description: 'ORA address has been copied to your clipboard.',
    });
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Your INR Balance</CardTitle>
            <CardDescription>Available to withdraw</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-4xl font-bold">₹0.00</div>
              </div>
              <div className="flex gap-2">
                <Button>
                  <Send className="mr-2 h-4 w-4" />
                  Send
                </Button>
                <Button variant="secondary">
                  <History className="mr-2 h-4 w-4" />
                  History
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Your ORA Balance</CardTitle>
            <LinkIcon className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">90</div>
            <p className="text-sm text-muted-foreground">ORA Coins</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your ORA Address</CardTitle>
            <CardDescription>
              Share this address to receive ORA coins.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <span className="font-mono text-lg">{oraAddress}</span>
            <Button variant="ghost" size="icon" onClick={copyToClipboard}>
              <Copy className="h-5 w-5" />
              <span className="sr-only">Copy Address</span>
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className="fixed bottom-0 left-0 right-0 border-t bg-background p-4 md:hidden">
        <Button className="w-full">Add Money</Button>
      </div>
    </div>
  );
}
