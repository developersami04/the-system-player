import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { achievements } from "@/lib/data";
import { Check, Lock, Trophy } from "lucide-react";

const AchievementIcon = ({ unlocked }: { unlocked: boolean }) => (
  <div className="relative">
    <Trophy
      className={cn(
        "h-12 w-12",
        unlocked ? "text-accent" : "text-muted-foreground/30"
      )}
    />
    {unlocked ? (
      <Check className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-green-500 text-white p-0.5" />
    ) : (
      <Lock className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-gray-600 text-white p-0.5" />
    )}
  </div>
);

export default function AchievementsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold tracking-tight font-headline">Achievements</h2>
        <p className="text-muted-foreground">
          See all the milestones you've reached on your journey.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {achievements.map((ach, i) => (
          <Card
            key={ach.id}
            style={{ animationDelay: `${i * 100}ms` }}
            className={cn(
              "transition-all hover:shadow-lg hover:-translate-y-1 animate-fade-in-up",
              ach.unlocked
                ? "border-accent/50 bg-accent/10"
                : "bg-card/50"
            )}
          >
            <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                <AchievementIcon unlocked={ach.unlocked} />
                <div>
                    <CardTitle
                        className={cn(!ach.unlocked && "text-muted-foreground")}
                    >
                        {ach.title}
                    </CardTitle>
                    <CardDescription className="mt-1">
                        {ach.description}
                    </CardDescription>
                </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
