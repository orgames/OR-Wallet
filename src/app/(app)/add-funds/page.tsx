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
import { Plus, CreditCard, Banknote } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const addFundsSchema = z.object({
  currency: z.string().min(1, 'Please select a currency.'),
  amount: z.coerce.number().positive('Amount must be positive.'),
  method: z.string().min(1, 'Please select a payment method.'),
});

export default function AddFundsPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof addFundsSchema>>({
    resolver: zodResolver(addFundsSchema),
    defaultValues: {
      currency: 'USD',
      amount: undefined,
      method: '',
    },
  });

  function onSubmit(values: z.infer<typeof addFundsSchema>) {
    console.log(values);
    toast({
      title: 'Funds Added',
      description: `You have successfully added ${values.amount} ${values.currency} to your wallet.`,
    });
    form.reset();
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Add Funds</h1>
      </div>

      <Card className="mx-auto w-full max-w-lg">
        <CardHeader>
          <CardTitle>Deposit to Your Wallet</CardTitle>
          <CardDescription>
            Choose your currency and payment method to add funds.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input type="number" step="any" placeholder="0.00" {...field} className="pr-20" />
                        <div className="absolute inset-y-0 right-0 flex items-center px-2">
                          <FormField
                            control={form.control}
                            name="currency"
                            render={({ field: selectField }) => (
                                <Select onValueChange={selectField.onChange} defaultValue={selectField.value}>
                                    <SelectTrigger className="w-auto border-none bg-transparent focus:ring-0">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {currencies.map(c => <SelectItem key={c.code} value={c.code}>{c.code}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            )}
                          />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="method"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Method</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a payment method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="credit_card">
                            <div className="flex items-center gap-2">
                                <CreditCard className="h-4 w-4" /> Credit Card
                            </div>
                        </SelectItem>
                        <SelectItem value="bank_transfer">
                            <div className="flex items-center gap-2">
                                <Banknote className="h-4 w-4" /> Bank Transfer
                            </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                <Plus className="mr-2 h-4 w-4" />
                {form.formState.isSubmitting ? 'Processing...' : 'Add Funds'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
