export default interface DynamicColumn<TData> {
  accessorKey: keyof TData;
  title: string;
  customCell?: (row: TData) => React.ReactNode; // Optional custom cell renderer
}