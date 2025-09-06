'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Button } from './ui/button';

export function UserProfile() {
  const { user, appUser } = useAuth();

  const level = appUser?.level || 1;
  const xp = appUser?.xp || 0;
  const xpToNextLevel = level * 1000;
  const xpPercentage = (xp / xpToNextLevel) * 100;

  if (!user || !appUser) {
    return null;
  }

  return (
    <Card>
        <CardHeader className="p-2 pt-0 md:p-4">
          <CardTitle>Level Up!</CardTitle>
          <CardDescription>
            Complete tasks to earn more XP and unlock new features.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
          <Button size="sm" className="w-full">
            View Tasks
          </Button>
        </CardContent>
      </Card>
  );
}
