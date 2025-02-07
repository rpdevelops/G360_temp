import * as React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils"; // Import the cn utility function
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import { TaskFront } from "@g360/core";

interface TaskCardProps extends Omit<TaskFront,'description'|'attributed'|'observers'>{
  className?: string; // Optional className prop
}

export function TaskCard({ id, title, date, startTime, endTime, className }: TaskCardProps) {
  return (
    <Card className={cn("bg-yellow-100", className)}>
      <CardHeader>
        <CardTitle>#{id} - {title}</CardTitle>
        <CardDescription>
          {date} - {startTime} to {endTime}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
