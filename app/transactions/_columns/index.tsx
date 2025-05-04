"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Transaction } from "@prisma/client";
import TransactionTypeBadge from "@/app/transactions/_components/type-badge"


import {
  TRANSACTION_CATEGORY_LABELS,
  TRANSACTION_PAYMENT_METHOD_LABELS,
} from "@/app/_constants/transactions";
 
export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({row: { original: transaction }}) => 
      <TransactionTypeBadge transaction={transaction} />
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({row: { original: transaction }}) => 
      TRANSACTION_CATEGORY_LABELS[transaction.category]
  },
  {
    accessorKey: "paymentMethod",
    header: "Método de pagamento",
    cell: ({row: { original: transaction }}) => 
      TRANSACTION_PAYMENT_METHOD_LABELS[transaction.paymentMethod]
  },
  {
    accessorKey: "date",
    header: "Data",
  },
  {
    accessorKey: "amount",
    header: "Valor"
  },
  {
    accessorKey: "actions",
    header: "",
  },
]
