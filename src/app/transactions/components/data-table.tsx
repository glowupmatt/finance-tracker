/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PaginationComp from "./PaginationComp";
import { useTransactions } from "@/context/TransactionsContext";
import React, { useState } from "react";
import { TransactionType } from "@/types/TransactionTypes";
import DialogPOST from "@/components/CRUDmodals/POSTcomps/DialogPOST";
import SearchBar from "./SearchBar";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionType | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const handleEditClick = (transaction: TransactionType) => {
    setSelectedTransaction(transaction);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedTransaction(null);
  };

  const { totalPages, setTotalPages } = useTransactions();

  const onPageChange = (page: number) => {
    setTotalPages(page);
  };

  return (
    <div className="rounded-md border bg-white shadow-md flex flex-col items-center justify-center overflow-hidden">
      <SearchBar />
      <Table className="w-full">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableCell key={header.id} className="p-8">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row: Row<TData> | any) => {
              const transaction = row.original.Transaction;

              return (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => handleEditClick(transaction)}
                  className="relative cursor-pointer"
                >
                  {row.getVisibleCells().map((cell: any) => {
                    return (
                      <TableCell key={cell.id} className="p-8">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="hidden">
        <DialogPOST
          type="TRANSACTION"
          CRUD="PUT"
          data={selectedTransaction ? selectedTransaction : undefined}
          openModal={openModal}
          onClose={handleClose}
        />
      </div>

      <PaginationComp
        transactionPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}
