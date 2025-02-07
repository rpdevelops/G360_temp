"use client";

import { ArrowDownIcon, ArrowUpIcon, CaretSortIcon, EyeNoneIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row, Column } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Row Actions
interface RowActionsProps<TData> {
  row: Row<TData>;
  onEdit?: (data: TData) => void;
  onDelete?: (data: TData) => void;
}

export function RowActions<TData>({ row, onEdit, onDelete }: RowActionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <DotsHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => onEdit?.(row.original)}>Edit</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onDelete?.(row.original)}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Column Header
interface ColumnHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
}

export function ColumnHeader<TData, TValue>({ column, title }: ColumnHeaderProps<TData, TValue>) {
  return (
    <div className="flex items-center space-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? <ArrowDownIcon /> : column.getIsSorted() === "asc" ? <ArrowUpIcon /> : <CaretSortIcon />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>Asc</DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>Desc</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeNoneIcon /> Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
