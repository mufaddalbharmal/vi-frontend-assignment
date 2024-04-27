"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { DataTablePagination } from "@/app/_components/data-table-pagination";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
    
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        columnResizeMode: "onChange"
    });
    return (
        <div className="space-y-4">
            <div className="rounded-md border">
                <Table style={{minWidth: table.getTotalSize()}}>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow 
                            key={headerGroup.id}>
                                {headerGroup.headers.map((header,index) => {
                                    return (
                                        <TableHead 
                                        key={header.id} 
                                        colSpan={header.colSpan}
                                        className={`${index<2 ? 'sticky bg-white left-0': ""}  
                                        ${index===1 && 'left-[88px]'}`}
                                        style={{ width: header.getSize() }}>                                        
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef.header,
                                                      header.getContext(),
                                                  )}
                                        <span className="bg-gray-500 w-[5px] h-[25px] cursor-col-resize select-none touch-none float-right" 
                                        onTouchStart={header.getResizeHandler()}          
                                        onMouseDown={header.getResizeHandler()}>
                                        </span> 
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="hovering"
                                >
                                    {row.getVisibleCells().map((cell,index) => (
                                        <TableCell key={cell.id}
                                        onClick={cell.column.id === "checkbox" ? () => {
                                            table.resetRowSelection(); 
                                            row.toggleSelected();
                                        } : () => { }}
                                        className={`hoveringCell 
                                        ${!row.getIsSelected() && "bg-white"} ${row.getIsSelected() && "bg-gray-300"}
                                        ${index<2 ? 'sticky left-0': ""} ${index===1 && 'left-[88px]'}
                                         `}
                                            style={{ width: cell.column.getSize() }}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} />
        </div>
    );
}
