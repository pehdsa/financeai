import z from "zod"
import { TransactionType, TransactionCategory, TransactionPaymentMethod } from "@prisma/client";

export const addTransactionSchema = z.object({
    name: z.string().trim().min(1),
    amount: z.number().positive(),
    type: z.nativeEnum(TransactionType),
    category: z.nativeEnum(TransactionCategory),
    paymentMethod: z.nativeEnum(TransactionPaymentMethod),
    date: z.date()
})