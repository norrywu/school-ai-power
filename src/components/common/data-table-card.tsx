import type { ReactNode } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TablePagination } from "@/components/common/table-pagination";

export type DataTableColumn<T> = {
  header: string;
  headClassName?: string;
  cellClassName?: string;
  render: (row: T) => ReactNode;
};

export type PaginationProps = {
  page: number;
  totalPages: number;
  totalRecords: number;
  onPageChange: (page: number) => void;
};

export function DataTableCard<T>({
  title,
  headerAction,
  caption,
  columns,
  data,
  rowKey,
  emptyMessage = "Belum ada data",
  pagination,
}: {
  title: string;
  headerAction?: ReactNode;
  caption?: string;
  columns: DataTableColumn<T>[];
  data: T[];
  rowKey: (row: T) => string;
  emptyMessage?: string;
  pagination?: PaginationProps;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        {headerAction}
      </CardHeader>
      <CardContent>
        <Table>
          {caption && <TableCaption>{caption}</TableCaption>}
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.header} className={column.headClassName}>
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={rowKey(row)}>
                {columns.map((column) => (
                  <TableCell
                    key={column.header}
                    className={column.cellClassName}
                  >
                    {column.render(row)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {data.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center text-muted-foreground py-6"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      {pagination && (
        <CardFooter className="flex flex-col sm:flex-row items-center justify-between border-t p-4 gap-4 text-xs text-muted-foreground">
          <div>
            Total <strong className="text-foreground">{pagination.totalRecords}</strong> data
            (Halaman {pagination.page} dari {pagination.totalPages})
          </div>
          <TablePagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={pagination.onPageChange}
          />
        </CardFooter>
      )}
    </Card>
  );
}
