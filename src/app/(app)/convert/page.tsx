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
import { ArrowRightLeft, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';

const convertSchema = z.object({
  fromCurrency: z.string().min(1, 'Please select a currency.'),
  fromAmount: z.coerce.number().positive('Amount must be positive.'),
  toCurrency: z.string().min(1, 'Please select a currency.'),
}).refine(data => data.fromCurrency !== data.toCurrency, {
  message: "Currencies must be different.",
  path: ["toCurrency"],
});

// Mock exchange rates relative to USD
const MOCK_RATES: Record<string, number> = {
  USD: 1,
  BTC: 60000,
  ETH: 3000,
  EUR: 1.1,
};

export default function ConvertPage() {
  const { toast } = useToast();
  const [convertedAmount, setConvertedAmount] = useState(0);

  const form = useForm<z.infer<typeof convertSchema>>({
    resolver: zodResolver(convertSchema),
    defaultValues: {
      fromCurrency: 'BTC',
      fromAmount: 1,
      toCurrency: 'USD',
    },
  });

  const { fromCurrency, fromAmount, toCurrency } = form.watch();

  useEffect(() => {
    if(fromCurrency && fromAmount > 0 && toCurrency && fromCurrency !== toCurrency) {
      const rateFrom = MOCK_RATES[fromCurrency];
      const rateTo = MOCK_RATES[toCurrency];
      if (rateFrom && rateTo) {
        const usdValue = fromAmount * rateFrom;
        setConvertedAmount(usdValue / rateTo);
      }
    } else {
      setConvertedAmount(0);
    }
  }, [fromCurrency, fromAmount, toCurrency]);


  function onSubmit(values: z.infer<typeof convertSchema>) {
    console.log(values);
    toast({
      title: 'Conversion Successful',
      description: `Converted ${values.fromAmount} ${values.fromCurrency} to ${convertedAmount.toFixed(8)} ${values.toCurrency}.`,
    });
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Convert Currency</h1>
      </div>

      <Card className="mx-auto w-full max-w-lg">
        <CardHeader>
          <CardTitle>Exchange</CardTitle>
          <CardDescription>
            Instantly convert between currencies in your wallet.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                  <FormField
                    control={form.control}
                    name="fromAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>You send</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input type="number" step="any" placeholder="0.0" {...field} className="pr-32 text-lg" />
                            <div className="absolute inset-y-0 right-0 flex items-center px-2">
                              <FormField
                                control={form.control}
                                name="fromCurrency"
                                render={({ field: selectField }) => (
                                  <Select onValueChange={selectField.onChange} defaultValue={selectField.value}>
                                    <SelectTrigger className="w-[110px] border-none bg-transparent focus:ring-0">
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
                  
                  <div className="relative my-2 flex items-center justify-center">
                    <div className="absolute w-full border-b border-border"></div>
                    <Button type="button" variant="secondary" size="icon" className="relative h-8 w-8 rounded-full">
                      <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                  
                  <FormItem>
                    <FormLabel>You receive</FormLabel>
                      <div className="relative">
                        <Input readOnly value={convertedAmount > 0 ? convertedAmount.toLocaleString('en-US', { maximumFractionDigits: 8}) : "0.0"} className="pr-32 text-lg" />
                        <div className="absolute inset-y-0 right-0 flex items-center px-2">
                          <FormField
                            control={form.control}
                            name="toCurrency"
                            render={({ field }) => (
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="w-[110px] border-none bg-transparent focus:ring-0">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {currencies.map(c => <SelectItem key={c.code} value={c.code}>{c.code}</SelectItem>)}
                                </SelectContent>
                                <FormMessage />
                              </Select>
                            )}
                          />
                        </div>
                      </div>
                  </FormItem>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                1 {fromCurrency} ≈ {(MOCK_RATES[fromCurrency] / MOCK_RATES[toCurrency]).toFixed(4)} {toCurrency}
              </div>
              
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting || form.formState.isSubmitted}>
                <RefreshCw className="mr-2 h-4 w-4" />
                {form.formState.isSubmitting ? 'Converting...' : 'Convert'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
