'use client';

import { useAuth } from '@/hooks/use-auth';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Button } from './ui/button';
import Link from 'next/link';

export function UserProfile() {
  const { user, appUser } = useAuth();

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
          <Button size="sm" className="w-full" asChild>
            <Link href="/tasks">View Tasks</Link>
          </Button>
        </CardContent>
      </Card>
  );
}
