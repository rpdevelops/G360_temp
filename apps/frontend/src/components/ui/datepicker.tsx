import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ptBR } from "date-fns/locale";
interface DatePickerProps {
  selectedDate?: Date;
  onDateChange: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string; // Add className prop
}

export function DatePicker({
  selectedDate,
  onDateChange,
  placeholder = "Pick a date",
  className = "", // Default to empty string
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelectDate = (date: Date | undefined) => {
    onDateChange(date);
    setOpen(false); // Close popover when a date is selected
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[180px] pl-3 text-left font-normal",
            !selectedDate && "text-muted-foreground",
            className // Pass className prop to Button
          )}
        >
          {selectedDate ? (
            (selectedDate.toLocaleDateString('pt-BR'))
          ) : (
            <span>{placeholder}</span>
          )}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-auto p-0", className)} align="start">
        <Calendar
          mode="single"
          className="rounded-md border shadow"
          selected={selectedDate}
          onSelect={handleSelectDate}
          disabled={(date) => date < new Date()} // Optional: disable past dates
          locale={ptBR}
        />
      </PopoverContent>
    </Popover>
  );
}
