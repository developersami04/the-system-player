'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/use-auth';

export function UserProfile() {
  const { user } = useAuth();

  // Dummy data for progress, replace with real data later
  const level = 12;
  const xp = 450;
  const xpToNextLevel = 1000;
  const xpPercentage = (xp / xpToNextLevel) * 100;

  if (!user) {
    return null;
  }

  return (
    <div className="flex w-full flex-col gap-2 p-2 group-data-[collapsible=icon]:items-center">
      <div className="flex items-center gap-2">
        <Avatar className="h-10 w-10">
          <AvatarImage src={user.photoURL!} alt={user.displayName!} data-ai-hint="avatar" />
          <AvatarFallback>{user.displayName?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 overflow-hidden group-data-[collapsible=icon]:hidden">
          <p className="truncate font-semibold">{user.displayName}</p>
          <p className="text-xs text-muted-foreground">Level {level}</p>
        </div>
      </div>
      <div className="w-full overflow-hidden group-data-[collapsible=icon]:hidden">
        <Progress value={xpPercentage} className="h-2" />
        <p className="mt-1 text-right text-xs text-muted-foreground">
          {xp} / {xpToNextLevel} XP
        </p>
      </div>
    </div>
  );
}
