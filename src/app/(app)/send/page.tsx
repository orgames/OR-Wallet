'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { currencies } from '@/lib/data.tsx';
import { Send, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const sendSchema = z.object({
  currency: z.string().min(1, 'Please select a currency.'),
  amount: z.coerce.number().positive('Amount must be positive.'),
  recipient: z.string().min(10, 'Recipient address is too short.'),
});

export default function SendPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof sendSchema>>({
    resolver: zodResolver(sendSchema),
    defaultValues: {
      currency: '',
      amount: undefined,
      recipient: '',
    },
  });

  function onSubmit(values: z.infer<typeof sendSchema>) {
    console.log(values);
    toast({
      title: 'Transaction Sent',
      description: `You have sent ${values.amount} ${values.currency} to ${values.recipient}.`,
    });
    form.reset();
  }

  const selectedCurrencyCode = form.watch('currency');
  const selectedCurrency = currencies.find(c => c.code === selectedCurrencyCode);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Send Funds</h1>
      </div>

      <Card className="mx-auto w-full max-w-lg">
        <CardHeader>
          <CardTitle>Send Cryptocurrency</CardTitle>
          <CardDescription>
            Enter the details below to send funds to another wallet.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From Wallet</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a currency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {currencies.map((c) => (
                          <SelectItem key={c.code} value={c.code}>
                            <div className="flex w-full items-center gap-2">
                              <c.icon className="h-4 w-4" />
                              <span>{c.name} ({c.code})</span>
                              <span className="ml-auto font-mono text-muted-foreground">{c.balance.toFixed(4)}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="recipient"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipient Address</FormLabel>
                    <FormControl>
                       <div className="relative">
                         <Input placeholder="Enter wallet address" {...field} />
                         <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground">
                            <Copy className="h-4 w-4" />
                         </Button>
                       </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input type="number" step="any" placeholder="0.00" {...field} className="pr-12"/>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-muted-foreground">
                          {selectedCurrency?.code || ''}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                <Send className="mr-2 h-4 w-4" />
                {form.formState.isSubmitting ? 'Sending...' : 'Send Funds'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
