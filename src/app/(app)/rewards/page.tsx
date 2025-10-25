'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Award } from 'lucide-react';

export default function RewardsPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Award className="h-6 w-6" />
            <CardTitle>Earn Rewards</CardTitle>
          </div>
          <CardDescription>
            Discover opportunities to earn more rewards.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Reward opportunities will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
