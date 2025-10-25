'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, Video } from 'lucide-react';

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
        <CardContent className="flex flex-col items-start gap-4">
            <p>Watch videos to earn ORA coins.</p>
            <Button>
              <Video className="mr-2 h-4 w-4" />
              Watch and Earn
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
