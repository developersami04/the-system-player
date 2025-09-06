'use client';

import { useState, useEffect } from "react";
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
import { PlusCircle, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { useAuth } from "@/hooks/use-auth";
import { getTasks, updateTask, deleteTask } from "@/lib/firebase";
import type { Task } from "@/lib/types";
import { AddTaskSheet } from "@/components/add-task-sheet";

export default function TasksPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isSheetOpen, setSheetOpen] = useState(false);

  const fetchTasks = async () => {
    if (user) {
      const userTasks = await getTasks(user.uid);
      // @ts-ignore
      setTasks(userTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)));
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  const handleTaskToggle = async (taskId: string, completed: boolean) => {
    if (user) {
      await updateTask(user.uid, taskId, { completed });
      setTasks(tasks.map(t => t.id === taskId ? { ...t, completed } : t));
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (user) {
      await deleteTask(user.uid, taskId);
      setTasks(tasks.filter(t => t.id !== taskId));
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight font-headline">Task List</h2>
          <p className="text-muted-foreground">
            Manage all your daily and long-term tasks here.
          </p>
        </div>
        <Button onClick={() => setSheetOpen(true)}>
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
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px] text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id} className={task.completed ? "bg-card/50" : ""}>
                <TableCell>
                  <Checkbox 
                    checked={task.completed} 
                    onCheckedChange={(checked) => handleTaskToggle(task.id, !!checked)}
                    aria-label="Mark task as complete" 
                  />
                </TableCell>
                <TableCell className={`font-medium ${task.completed ? "text-muted-foreground line-through" : ""}`}>
                  {task.title}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{task.category}</Badge>
                </TableCell>
                <TableCell>{format(task.dueDate, "PPP")}</TableCell>
                <TableCell>
                  <Badge variant={task.completed ? "secondary" : "default"} className={task.completed ? "" : ""}>
                    {task.completed ? "Completed" : "Pending"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteTask(task.id)}>
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <AddTaskSheet isOpen={isSheetOpen} setOpen={setSheetOpen} onTaskAdded={fetchTasks} />
    </div>
  );
}
