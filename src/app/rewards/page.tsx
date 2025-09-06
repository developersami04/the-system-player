import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";
import { rewards } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function RewardsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight font-headline">Rewards Vault</h2>
        <p className="text-muted-foreground">
          Redeem rewards you've earned by reaching milestones.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rewards.map((reward) => (
          <Card
            key={reward.id}
            className={cn(
              "flex flex-col transition-all",
              reward.unlocked
                ? "border-primary/50"
                : "border-dashed"
            )}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className={cn("h-6 w-6", reward.unlocked ? "text-primary" : "text-muted-foreground")} />
                <span>{reward.title}</span>
              </CardTitle>
              <CardDescription>
                Milestone: {reward.milestone}
              </CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto">
              <Button disabled={!reward.unlocked} className="w-full">
                {reward.unlocked ? "Redeem" : "Locked"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
