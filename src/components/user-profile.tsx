import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

export function UserProfile() {
  const user = {
    name: 'Player One',
    level: 12,
    xp: 450,
    xpToNextLevel: 1000,
    avatarUrl: 'https://picsum.photos/100',
  };
  const xpPercentage = (user.xp / user.xpToNextLevel) * 100;

  return (
    <div className="flex w-full flex-col gap-2 p-2 group-data-[collapsible=icon]:items-center">
      <div className="flex items-center gap-2">
        <Avatar className="h-10 w-10">
          <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="avatar" />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 overflow-hidden group-data-[collapsible=icon]:hidden">
          <p className="truncate font-semibold">{user.name}</p>
          <p className="text-xs text-muted-foreground">Level {user.level}</p>
        </div>
      </div>
      <div className="w-full overflow-hidden group-data-[collapsible=icon]:hidden">
        <Progress value={xpPercentage} className="h-2" />
        <p className="mt-1 text-right text-xs text-muted-foreground">
          {user.xp} / {user.xpToNextLevel} XP
        </p>
      </div>
    </div>
  );
}
