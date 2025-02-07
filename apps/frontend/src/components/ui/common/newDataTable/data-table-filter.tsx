"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DropdownFilterProps {
  title: string;
  options: { value: string; label: string }[];
  onSelect: (value: string) => void;
  onClear: () => void;
}

export function DropdownFilter({
  title,
  options,
  onSelect,
  onClear,
}: DropdownFilterProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-8">
          {title}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onSelect(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onClear}>Clear</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
