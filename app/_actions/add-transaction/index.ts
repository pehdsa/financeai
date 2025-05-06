"use server"

import { TransactionType, TransactionCategory, TransactionPaymentMethod } from "@prisma/client"
import {db} from "@/app/_lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { addTransactionSchema } from "./schema"
import { revalidatePath } from "next/cache"

interface AddTransactionProps {
    id?: string
    name: string,
    amount: number,
    type: TransactionType,
    category: TransactionCategory,
    paymentMethod: TransactionPaymentMethod,
    date: Date
}

export const upsertTransaction = async (params: AddTransactionProps) => {
    addTransactionSchema.parse(params);

    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthorized")
    }

    await db.transaction.upsert({
        update: { ...params, userId },
        create: { ...params, userId },
        where: {
            id: params.id ?? ""
        },
    })

    revalidatePath("/transactions");
}