'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { achievements, dailyTasks, currentMissions } from "@/lib/data";
import { Check, Edit, Medal, Target, Trophy } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const staticUser = {
    name: "Player One",
    avatarUrl: "https://picsum.photos/100",
    joinDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
    title: "Novice Adventurer"
};

const stats = {
    tasksCompleted: dailyTasks.filter(t => t.completed).length,
    missionsInProgress: currentMissions.length,
    achievementsUnlocked: achievements.filter(a => a.unlocked).length
}

export default function ProfilePage() {
    const { user, appUser } = useAuth();

    const displayName = user?.displayName || staticUser.name;
    const avatarUrl = user?.photoURL || staticUser.avatarUrl;
    const joinDate = (appUser?.createdAt && new Date(appUser.createdAt)) || staticUser.joinDate;

    const level = appUser?.level || 1;
    const xp = appUser?.xp || 0;
    const xpToNextLevel = level * 1000;
    const xpPercentage = (xp / xpToNextLevel) * 100;

    const recentAchievements = achievements.filter(a => a.unlocked).slice(0, 5);

    if (!appUser) {
        return <div>Loading profile...</div>
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <Card className="overflow-hidden animate-fade-in-up">
                <div className="h-24 bg-primary/20" />
                <CardContent className="p-6 pt-0">
                    <div className="flex items-end -mt-16">
                        <Avatar className="h-32 w-32 border-4 border-background transition-transform hover:scale-105">
                            <AvatarImage src={avatarUrl} alt={displayName!} data-ai-hint="avatar" />
                            <AvatarFallback>{displayName!.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4 mb-2">
                            <h1 className="text-3xl font-bold font-headline">{displayName}</h1>
                            <p className="text-sm text-muted-foreground">Member since {joinDate.toLocaleDateString()}</p>
                        </div>
                        <Button variant="outline" size="icon" className="ml-auto mb-2">
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit Profile</span>
                        </Button>
                    </div>

                    <div className="mt-4">
                        <div className="flex items-center gap-4">
                            <Badge variant="secondary" className="text-base">{staticUser.title}</Badge>
                            <div className="text-lg font-bold">LV. {level}</div>
                        </div>
                        <div className="mt-2">
                            <Progress value={xpPercentage} className="h-4" />
                            <div className="text-right text-xs text-muted-foreground mt-1">
                                {xp} / {xpToNextLevel} XP to next level
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
                        <Check className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.tasksCompleted}</div>
                    </CardContent>
                </Card>
                <Card className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Missions in Progress</CardTitle>
                        <Target className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.missionsInProgress}</div>
                    </CardContent>
                </Card>
                <Card className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Achievements Unlocked</CardTitle>
                        <Trophy className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.achievementsUnlocked}</div>
                    </CardContent>
                </Card>
            </div>
            
            <div className="grid gap-6 lg:grid-cols-2">
                <Card className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                    <CardHeader>
                        <CardTitle>Recent Achievements</CardTitle>
                        <CardDescription>Your latest accomplishments.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {recentAchievements.map((ach) => (
                                <li key={ach.id} className="flex items-center gap-4">
                                    <div className="p-2 bg-accent/20 rounded-full">
                                        <Medal className="h-6 w-6 text-accent" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">{ach.title}</p>
                                        <p className="text-sm text-muted-foreground">{ach.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                <Card className="animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                    <CardHeader>
                        <CardTitle>In-Progress Missions</CardTitle>
                        <CardDescription>Quests you are currently undertaking.</CardDescription>
                    </CardHeader>
                    <CardContent>
                    <ul className="space-y-4">
                        {currentMissions.map((mission) => (
                        <li key={mission.id}>
                            <p className="font-semibold">{mission.title}</p>
                            <p className="text-sm text-muted-foreground mb-2">
                            {mission.description}
                            </p>
                            <div className="flex items-center justify-between">
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
            </div>
        </div>
    );
}
