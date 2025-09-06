
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Flame, Sword } from "lucide-react";
import { RecommendationForm } from "@/components/recommendation-form";
import { dailyTasks, currentMissions, rankings } from "@/lib/data";
import { useAuth } from "@/hooks/use-auth";


export default function DashboardPage() {
  const { user, appUser } = useAuth();
  
  const displayName = user?.displayName || "Player One";
  const level = appUser?.level || 1;
  const xp = appUser?.xp || 0;
  const xpToNextLevel = level * 1000;
  const xpPercentage = (xp / xpToNextLevel) * 100;


  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="lg:col-span-3 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="font-headline text-2xl md:text-3xl">
            Welcome Back, {displayName}
          </CardTitle>
          <CardDescription>
            Your progress is looking great. Keep it up!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="text-lg font-bold">LV. {level}</div>
            <div className="flex-1">
              <Progress value={xpPercentage} className="h-4" />
              <div className="text-right text-xs text-muted-foreground mt-1">
                {xp} / {xpToNextLevel} XP
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-headline text-xl">Daily Tasks</CardTitle>
          <Sword className="h-6 w-6 text-accent" />
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {dailyTasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center gap-3 p-2 rounded-md transition-colors hover:bg-secondary"
              >
                <CheckCircle2
                  className={`h-5 w-5 ${
                    task.completed
                      ? "text-accent"
                      : "text-muted-foreground"
                  }`}
                />
                <span
                  className={`flex-1 ${
                    task.completed ? "line-through text-muted-foreground" : ""
                  }`}
                >
                  {task.title}
                </span>
                <Badge variant="outline" className="font-mono text-xs">{task.category}</Badge>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-headline text-xl">
            Current Missions
          </CardTitle>
          <Flame className="h-6 w-6 text-accent" />
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {currentMissions.map((mission) => (
              <li key={mission.id} className="group">
                <p className="font-semibold">{mission.title}</p>
                <p className="text-sm text-muted-foreground">
                  {mission.description}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <Progress value={mission.progress} className="h-2 w-3/4" />
                  <span className="text-xs font-bold text-accent">
                    +{mission.xp} XP
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2 lg:col-span-1">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Rankings</CardTitle>
          <CardDescription>Your position on the leaderboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              {rankings.slice(0, 4).map((player) => (
                <TableRow key={player.rank}>
                  <TableCell className="font-medium">#{player.rank}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={player.name === 'Player One' && user?.photoURL ? user.photoURL : player.avatarUrl} alt={player.name} data-ai-hint="avatar" />
                        <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{player.name === 'Player One' && user?.displayName ? user.displayName : player.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    LV. {player.level}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle className="font-headline text-xl">
            Personalized Recommendations
          </CardTitle>
          <CardDescription>
            Let the system generate new challenges for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RecommendationForm />
        </CardContent>
      </Card>
    </div>
  );
}
