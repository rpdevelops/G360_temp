import { ColumnDef } from "@tanstack/react-table";
import { RowActions, ColumnHeader } from "./data-table-utils";
import DynamicColumn from "./dynamic-column";

interface Callbacks<TData> {
  onEdit: (data: TData) => void;
  onDelete: (data: TData) => void;
}

export function getColumns<TData>(
  dynamicColumns: DynamicColumn<TData>[],
  callbacks: Callbacks<TData>
): ColumnDef<TData>[] {
  const dynamicColumnDefs: ColumnDef<TData>[] = dynamicColumns.map((col) => ({
    accessorKey: col.accessorKey,
    header: ({ column }) => <ColumnHeader column={column} title={col.title} />,
    cell: ({ row }) =>
      col.customCell
        ? col.customCell(row.original)
        : <span>{row.getValue(col.accessorKey as string)}</span>,
  }));

  const actionsColumn: ColumnDef<TData> = {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => (
      <RowActions
        row={row}
        onEdit={callbacks.onEdit}
        onDelete={callbacks.onDelete}
      />
    ),
  };

  return [...dynamicColumnDefs, actionsColumn];
}
