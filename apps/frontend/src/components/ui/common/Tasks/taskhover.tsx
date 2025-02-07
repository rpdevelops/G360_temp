import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { TaskCard } from "./taskcard";
import { Task, TaskFront } from "@g360/core";
import { FormTask } from "./formtask";
import { Popover, PopoverContent, PopoverTrigger } from "../../popover";
import { cn } from "@/lib/utils"; // Import utility for conditional classnames
import { parse } from "date-fns";
import { Dispatch, SetStateAction } from 'react';

interface TaskHoverProps extends TaskFront {
  className?: string; // Optional className prop
  username: string;   // Novo prop para username
  setEvents: Dispatch<SetStateAction<TaskFront[]>>; // Novo prop para setEvents
}

export function TaskHover({
  id,
  title,
  description,
  attributed,
  observers,
  date,
  startTime,
  endTime,
  status,
  className, // Default to empty string if no className is passed
  username,   // Novo prop para username
  setEvents,  // Novo prop para setEvents
}: TaskHoverProps) {

  const handleSave = (updatedTaskData: Task) => {
    // Handle the task save logic here (e.g., API call or state update)
  };
  const parseDate = (dateString: string) => parse(dateString, "dd/MM/yyyy", new Date());
  return (
    <Popover>
      <PopoverTrigger asChild>
        {/* Apply the className to the container div */}
        <div className={cn("task-hover-trigger")}>
          <TaskCard
            id={id}
            title={title}
            date={date}
            startTime={startTime}
            endTime={endTime}
            className={className}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className={cn("w-[450px]")}>
        <div className={cn("form-task-container")}>
          <FormTask
            initialData={{
              id, title, description, attributed, observers, date: parseDate(date), startTime, endTime, status
            }}
            onSave={handleSave}
            username={username} // Passe username como prop
            setEvents={setEvents} // Passe setEvents como prop
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
