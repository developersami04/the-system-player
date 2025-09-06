import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircle } from "lucide-react";
import { allTasks } from "@/lib/data";
import { format } from "date-fns";

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight font-headline">Task List</h2>
          <p className="text-muted-foreground">
            Manage all your daily and long-term tasks here.
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Task</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allTasks.map((task) => (
              <TableRow key={task.id} className={task.completed ? "bg-card/50" : ""}>
                <TableCell>
                  <Checkbox checked={task.completed} aria-label="Mark task as complete" />
                </TableCell>
                <TableCell className={`font-medium ${task.completed ? "text-muted-foreground line-through" : ""}`}>
                  {task.title}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{task.category}</Badge>
                </TableCell>
                <TableCell>{format(task.dueDate, "PPP")}</TableCell>
                <TableCell className="text-right">
                  <Badge variant={task.completed ? "secondary" : "default"} className={task.completed ? "text-accent" : ""}>
                    {task.completed ? "Completed" : "Pending"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
