import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flame } from "lucide-react";
import { allMissions } from "@/lib/data";

export default function MissionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight font-headline">Mission Board</h2>
        <p className="text-muted-foreground">
          Accept quests to accelerate your growth and earn massive XP.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {allMissions.map((mission) => (
          <Card key={mission.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flame className="h-6 w-6 text-primary" />
                <span>{mission.title}</span>
              </CardTitle>
              <CardDescription>{mission.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              {/* Future content like mission steps could go here */}
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="font-bold text-accent">+{mission.xp} XP</div>
              <Button>Accept Mission</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
