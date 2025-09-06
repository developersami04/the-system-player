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
import { rankings } from "@/lib/data";

export default function RankingsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold tracking-tight font-headline">Leaderboard</h2>
        <p className="text-muted-foreground">
          See how you stack up against other players in the system.
        </p>
      </div>
      <div className="rounded-lg border animate-fade-in-up">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Rank</TableHead>
              <TableHead>Player</TableHead>
              <TableHead>Level</TableHead>
              <TableHead className="text-right">Total XP</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rankings.map((player) => (
              <TableRow key={player.rank} className={player.name === "Player One" ? "bg-primary/20" : ""}>
                <TableCell>
                  <Badge variant={player.rank <= 3 ? "default" : "secondary"} className="text-lg">
                    #{player.rank}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 transition-transform hover:scale-105">
                      <AvatarImage src={player.avatarUrl} alt={player.name} data-ai-hint="avatar" />
                      <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{player.name}</span>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-base">
                  {player.level}
                </TableCell>
                <TableCell className="text-right font-mono text-base">
                  {player.xp.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
