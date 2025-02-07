// src/components/NewTask.tsx

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { FormTask } from "./formtask";
import { Task, TaskFront } from "@g360/core";
import { Dispatch, SetStateAction } from "react";

interface NewTaskProps {
  onSave: (data: Task) => void;
  setEvents: Dispatch<SetStateAction<TaskFront[]>>; // Prop to update events
  username: string; // Prop for the username
}

export function NewTask({ onSave, setEvents, username }: NewTaskProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Nova Tarefa</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[450px]">
        <FormTask onSave={onSave} setEvents={setEvents} username={username}/>
      </PopoverContent>
    </Popover>
  );
}
